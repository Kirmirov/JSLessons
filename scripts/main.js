const output = document.getElementById('output');
const urlPhotos = 'https://jsonplaceholder.typicode.com/photos';

const getData = (url, body) => {
    return new Promise ((resolve, reject) => {
        const request = new XMLHttpRequest();
        request.open('POST', url);
        request.setRequestHeader('Content-Type', 'application/json')
        request.addEventListener('readystatechange', () => {
        if(request.readyState !== 4){
            return;
        }
        if(request.status === 201){
            const response = JSON.parse(request.responseText);
            resolve(response);
        }else {
            reject(request.statusText);
        }
    });
        request.send(JSON.stringify(body));
    });
};

const body = {
    "name": "Kirill",
    "albumId": 30,
    "title": "aaskskkkk dkdkkdkfkf !!!!k dkdkdkkd",
    "url": "https://study.up-skills.ru/",
    "thumbnailUrl": "https://study.up-skills.ru/"
}

getData(urlPhotos, body)
    .then(response => console.log(response))
    .catch(error => console.log(error));