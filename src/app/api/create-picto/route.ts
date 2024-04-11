import { Midjourney } from 'midjourney';

//export const dynamic = 'force-dynamic'; // defaults to auto

const client = new Midjourney({
  ServerId: <string>process.env.PICTO_SERVER_ID,
  ChannelId: <string>process.env.PICTO_CHANNEL_ID,
  SalaiToken: <string>process.env.PICTO_SALAI_TOKEN,
  Debug: false,
  Ws: true,
  MaxWait: 100000,
});

async function initClient() {
  console.log('initClient');
  await client.init();
}

initClient();

async function createPicto(description: string) {
  const basePrompt =
    ' colored as a pictogram in arasaac style with transparent background --style 56xABarnXQy --version 5.2 --fast';

  //Generate the Midjourney image
  const Imagine = await client.Imagine(
    description + basePrompt,
    // (uri, progress) => {
    // console.log('loading', uri, 'progress', progress);
    //},
  );
  if (!Imagine) {
    console.error('Error generating AI image');
    throw new Error('Error generating AI image');
  }
  console.log('Imagine');
  // Get id for the first image
  const U1CustomID = Imagine.options?.find((o) => o.label === 'U1')?.custom;
  if (!U1CustomID) {
    throw new Error('Error generating AI image');
  }
  console.log('U1CustomID', U1CustomID);
  // Upscale the first generated image
  const Upscale = await client.Custom({
    msgId: <string>Imagine.id,
    flags: Imagine.flags,
    customId: U1CustomID,
    //loading: (uri, progress) => {
    //console.log('loading', uri, 'progress', progress);
    //},
  });
  console.log('Upscale');
  if (!Upscale) {
    console.error('Error upscaling the first generated image');
    throw new Error('Error upscaling the first generated image');
  }
  if (!Imagine.options)
    throw new Error('Error upscaling the first generated image');

  const changeImageIds = Imagine.options
    .splice(0, 4)
    .map((option) => option.custom);
  client.Close();
  return {
    url: Upscale.uri,
    id: Imagine.id,
    content: Upscale.content,
    progress: Upscale.progress,
    proxy_url: Upscale.proxy_url,
    changeImageIds: changeImageIds,
  };
}

// async function changePicto(imageId: string, changeImageId: string) {
//   try {
//     const Upscale = await client.Custom({
//       msgId: imageId,
//       flags: 0,
//       customId: changeImageId,
//       //loading: (uri, progress) => {
//       //console.log("loading", uri, "progress", progress);
//       //},
//     });
//     if (!Upscale) {
//       console.error('Error upscaling the generated image');
//       throw new Error('Error upscaling the generated image');
//     }
//     return {
//       url: Upscale.uri,
//       id: Upscale.id,
//       content: Upscale.content,
//       progress: Upscale.progress,
//       proxy_url: Upscale.proxy_url,
//       options: Upscale.options,
//       flags: Upscale.flags,
//     };
//   } catch (err) {
//     console.error('Error upscaling the generated image');
//     throw new Error('Error upscaling the generated image');
//   }
// }

export async function POST(request: Request) {
  console.log('POST request');
  const res = await request.json();
  if (!res.description)
    return new Response('No description provided', { status: 400 });
  const generatedPicto = await createPicto(res.description);

  return new Response(JSON.stringify(generatedPicto), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
