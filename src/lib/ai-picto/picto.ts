export async function createAIPicto(description: string) {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  try {
    // Imagine image
    const imagineBody: string = JSON.stringify({
      description: description,
    });
    const response = await fetch('/api/mymidjourney/imagine', {
      method: 'POST',
      headers: myHeaders,
      body: imagineBody,
      redirect: 'follow',
      cache: 'no-store',
    });
    const data = await response.json();

    const message = await fetch('/api/mymidjourney/message/' + data.messageId, {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
      cache: 'no-store',
    });
    const messageData = await message.json();

    // Upscale image
    const buttonBody: string = JSON.stringify({
      messageId: messageData.messageId,
      button: 'U1',
    });
    const buttonResponse = await fetch('/api/mymidjourney/button', {
      method: 'POST',
      headers: myHeaders,
      body: buttonBody,
      redirect: 'follow',
      cache: 'no-store',
    });
    const buttonData = await buttonResponse.json();

    const upscaleMsg = await fetch(
      '/api/mymidjourney/message/' + buttonData.messageId,
      {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
        cache: 'no-store',
      },
    );
    const msgData = await upscaleMsg.json();

    return {
      url: msgData.uri,
      id: messageData.messageId,
      content: '',
      progress: msgData.progress.toString(),
      proxy_url: msgData.uri,
      changeImageIds: ['U1', 'U2', 'U3', 'U4'],
    };
  } catch (error) {
    console.error('Error generating AI image');
  }
}

export async function changePicto(messageId: string, button: string) {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  try {
    // Upscale image
    const buttonBody: string = JSON.stringify({
      messageId: messageId,
      button: button,
    });
    const buttonResponse = await fetch('/api/mymidjourney/button', {
      method: 'POST',
      headers: myHeaders,
      body: buttonBody,
      redirect: 'follow',
      cache: 'no-store',
    });
    const buttonData = await buttonResponse.json();

    const upscaleMsg = await fetch(
      '/api/mymidjourney/message/' + buttonData.messageId,
      {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
        cache: 'no-store',
      },
    );
    const msgData = await upscaleMsg.json();

    return {
      url: msgData.uri,
      id: msgData.messageId,
      content: '',
      progress: msgData.progress.toString(),
      proxy_url: msgData.uri,
      options: [],
      flags: '',
    };
  } catch (err) {
    console.error('Error upscaling the generated image');
    throw new Error('Error upscaling the generated image');
  }
}
