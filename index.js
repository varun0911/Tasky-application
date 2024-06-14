
// var state = {
//     taskList : [
//         {
//             imageURL: "",
//             taskTtile: "",
//             taskType: "",
//             taskDescription: ""
//         }
//     ]
// }

const state = {
    taskList : [],
};

const taskContents = document.querySelector(".task__contents");
const taskModal = document.querySelector(".task__modal__body");

console.log(taskContents);
console.log(taskModal);

const htmlTaskContent = ({ id, title, description, type, url}) => `
    <div class="col-md-6 col-lg-4 mt-3" id=${id}>
        <div class="card shadow task__card">
            <div class="card-header d-flex justify-content-end task__card__header">
                <button type="button" class="btn btn-outline-info" name=${id}>
                <i class="fas fa-pencil-alt" name=${id}></i>
                </button>
                <button type="button" class="btn btn-outline-danger" name=${id}>
                <i class="fas fa-trash-alt" name=${id}></i>
                </button>
            </div>
            <div class="card-body">
                ${
                    url &&
                    `<img width="100%" src=${url} alt="card image" class="card-img-top md-3 rounded=lg" />`
                }
                <h4 class="card-title task__card__title">${title}</h4>
                <p class="description trim-3-lines text-muted">${description}</p>
                <div class="tags text-white d-flex flex-wrap">
                    <span class="badge bg-primary">${type}</span>
                </div>
            </div>
            <div class="card-footer">
                <button type="button" class="btn btn-outline-primary float-right" data-bs-toggle="modal" data-bs-target="#showTask">Open Task</button>
            </div>
        </div>
    </div>
`;

// modal body when clicked open

const htmlModalContent = ({ id, title, type, description, url}) => {
    const date = new Date(parseInt(id));
    return `
    <div id=${id}>
        ${
            url && 
            `<img width="100%" src=${url} alt="card image" class="img-fluid place__holder__img mb-3" />`
        }
        <strong class="text-muted text-sm">Created on: ${date.toDateString()}</strong>
        <h2 class="my-3">${title}</h2>
        <p class="text-muted">${description}</p>
    </div>    
    `
};

// Converting JSON into string => to store in localStorage
const updateLocalStorage = () => {
    localStorage.setItem(
        "tasky",
        JSON.stringify({
            tasks: state.taskList,
        })
    );
};

// Converting String into JSON => to display the content in cards on the screen
const LoadInitialData = () => {
    const localStorageCopy = JSON.parse(localStorage.task);

    if(localStorageCopy) state.taskList = localStorageCopy.tasks;

    state.taskList.map((cardDate) => {
        taskContents.innerAdjacentHTML("beforeend", htmlTaskContent(cardDate));
    });
};


// Function to handle submit i.e., take iput from html and store in js variables
const handleSubmit = (event) => {
    console.log("triggerd");
    const id = `${Date.now()}`;
    const input = {
        url: document.getElementById("imageUrl").value,
        title: document.getElementById("taskTitle").value,
        type: document.getElementById("tags").value,
        description: document.getElementById("taskDescription").value
    };
    if(input.title==="" || input.tags==="" || input.description===""){
        return alert("Please fill all necessary fields");
    }
    taskContents.innerAdjacentHTML("beforeend",htmlTaskContent({...input, id}));
    state.taskList.push({...input, id});
    updateLocalStorage();
};

//open the task
//edit task
//save edit
//search function