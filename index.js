let userHtml = document.querySelector("#userHtml");
let paginationHtml = document.querySelector("#paginationHtml"); 
const userData = [ ];

class UserModel {
    constructor() {
        this.limit = 2;
    }

    get users() {
        let users = window.localStorage.getItem("users");
        return JSON.parse(users) || userData;
    }

    renderUsers(pagination = 1) {
        userHtml.innerHTML = ''; 
        let start = (pagination - 1) * this.limit;
        let end = pagination * this.limit;
        let pageUsers = this.users.slice(start, end);

        for (let user of pageUsers) {
            userHtml.innerHTML += getUsersHtml(user);
        }

        this.deleteUsers();
    }

    renderPagination() {
        paginationHtml.innerHTML = '';
        let pageCount = Math.ceil(this.users.length / this.limit);

        for (let i = 1; i <= pageCount; i++) {
            let btn = document.createElement("button");
            btn.innerText = i;
            btn.classList.add("pagination-btn");
            btn.addEventListener("click", () => {
                this.renderUsers(i);
            });
            paginationHtml.appendChild(btn);
        }
    }

    deleteUsers() {
        userHtml.addEventListener('click', function (e) {
            if (e.target.classList.contains('fa-trash')) {
                const row = e.target.closest('tr');
                if (row) {
                    row.remove();
                }
            }
        });
    }
}

let userModel = new UserModel();
userModel.renderUsers();
userModel.renderPagination();
