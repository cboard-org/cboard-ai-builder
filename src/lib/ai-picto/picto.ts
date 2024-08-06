async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export async function createAIPicto(description: string) {
  let imgDone: boolean = false;
  let tries: number = 0;
  type Message = {
    task_id: string;
    task_type: string;
    status: string;
    percentage: string;
  };
  type SuccessMessage = {
    task_id: string;
    sref?: string;
    task_type: string;
    original_image_url: string;
    image_urls: string[];
  };

  type MessageResponse = Message | SuccessMessage;

  let messageData: MessageResponse = {
    task_id: '',
    task_type: 'imagine',
    original_image_url: '',
    image_urls: [],
  };

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

    do {
      await delay(2000);
      const message = await fetch('/api/mymidjourney/message/', {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow',
        cache: 'no-store',
        body: JSON.stringify({ task_id: data.task_id }),
      });
      messageData = await message.json();
      tries++;
      if ('image_urls' in messageData) {
        imgDone = true;
      }
    } while (imgDone === false && tries < 40);
    imgDone = false;
    tries = 0;

    if (!('image_urls' in messageData))
      throw new Error('Error generating AI images');
    return {
      url: messageData.image_urls[0],
      id: messageData.task_id,
      content: '',
      progress: '100',
      proxy_url: messageData.image_urls[0],
      changeImageIds: messageData.image_urls,
    };
  } catch (error) {
    imgDone = true;
    console.error('Error generating AI image. ' + JSON.stringify(error));
  }
}
