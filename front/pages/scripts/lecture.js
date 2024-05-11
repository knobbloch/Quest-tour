async function getLecture() {
    const URL = `${window.location.origin}/script/get_lecture?l_id=4`;
    try {
      const response = await axios.get(URL);
      const data = response.data;
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      return 0;
    }
  }

function adjustHeight(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
}

document.addEventListener('DOMContentLoaded', async function() {
    const textarea = document.querySelector('.lecture');
    adjustHeight(textarea);
    window.onload = function() {
        adjustHeight(textarea);
    };
    window.onresize = function() {
        adjustHeight(textarea);
    };

    const lecture = await getLecture();
    const titleLect = document.querySelector('.title');
    const textLect = document.querySelector('.lecture');
    const videoLect = document.querySelector('.iframe');
    titleLect.innerHTML = lecture.title;
    textLect.innerHTML = lecture.description;
    videoLect.setAttribute("src", "https://www.youtube.com/embed/" + lecture.pathto.slice(17, lecture.pathto.length - 16));
    console.log(videoLect.getAttribute("src"));
});