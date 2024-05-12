const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');
async function getPractice() {
  const URL = `${window.location.origin}/script/get_practice?p_id=${id}`;
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

document.addEventListener('DOMContentLoaded', async function() {
    const practice = await getPractice();
    const titlePract = document.querySelector('.title');
    const textPract = document.querySelector('.task');
    titlePract.innerHTML = practice.title;
    textPract.innerHTML = practice.description;
})