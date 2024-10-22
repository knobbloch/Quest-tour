class Custom_checkbox extends HTMLElement {
    connectedCallback() {
        const text = this.getAttribute('text');
        const group = this.getAttribute('group');
        const id = this.getAttribute('id');
        const disabled = this.getAttribute('disabled') === 'true';
        const checked = this.getAttribute('checked') === 'true';

        this.innerHTML = `   
            <label class="label">
                <input id="question-type-toggle" ${disabled ? 'disabled' : ''} ${checked ? 'checked' : ''} type="checkbox" class="checkbox" name="${group}" value="yes">
                <span class="fake">
                    <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M11.6953 0.162106C12.0294 0.433152 12.0995 0.949317 11.8519 1.31499L6.49691 9.22195C5.91843 10.0761 4.81642 10.2544 4.03686 9.62L0.303744 6.58188C-0.0299928 6.31028 -0.0993633 5.794 0.148801 5.42873C0.396964 5.06347 0.868688 4.98755 1.20243 5.25916L4.93554 8.29727C5.0469 8.38791 5.20433 8.36243 5.28697 8.24041L10.6419 0.333448C10.8896 -0.0322278 11.3612 -0.10894 11.6953 0.162106Z" fill="transparent"/>
                    </svg>
                </span>
                <span class="text">${text}</span>
            </label>`;
    }
}

customElements.define('custom-checkbox', Custom_checkbox);

class Custom_radio extends HTMLElement {
    connectedCallback() {
        const text = this.getAttribute('text');
        const group = this.getAttribute('group');
        const value = this.getAttribute('value');
        const id = this.getAttribute('id');
        const disabled = this.getAttribute('disabled') === 'true';
        const checked = this.getAttribute('checked') === 'true';

        this.innerHTML = `
            <div>
                <label class="label">
                    <input type="radio" ${disabled ? 'disabled' : ''} ${checked ? 'checked' : ''} class="radiobutton" id="${id}" value="${value}" name="${group}" value="no">
                    <span class="fake-radio"></span>
                    <span class="text">${text}</span>
                </label>
            </div>
        `;
    }
}

customElements.define('custom-radiobutton', Custom_radio);

class Custom_checkbox_for_create extends HTMLElement {
    connectedCallback() {
        const text = this.textContent.trim();
        const group = this.getAttribute('group');
        

        this.innerHTML = `   

            <label class="label">
                <input id = "check" type="checkbox" class="checkbox" name="${group}" value="yes">
                
                <span class="fake">
                    <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M11.6953 0.162106C12.0294 0.433152 12.0995 0.949317 11.8519 1.31499L6.49691 9.22195C5.91843 10.0761 4.81642 10.2544 4.03686 9.62L0.303744 6.58188C-0.0299928 6.31028 -0.0993633 5.794 0.148801 5.42873C0.396964 5.06347 0.868688 4.98755 1.20243 5.25916L4.93554 8.29727C5.0469 8.38791 5.20433 8.36243 5.28697 8.24041L10.6419 0.333448C10.8896 -0.0322278 11.3612 -0.10894 11.6953 0.162106Z" fill="transparent"/>
                    </svg>
                </span>
                <textarea class="textarea" maxlength="100">${text}</textarea>           
                <img class="delete_answer" src="./svg/delete.svg">
            </label>`;
            const textarea = this.querySelector('.textarea');
            const hiddenText = document.getElementById('hidden-text');
    
            const updateWidth = () => {
                hiddenText.textContent = textarea.value || textarea.placeholder;
                textarea.style.width = `${hiddenText.offsetWidth + 20}px`;
            };
    
            // Устанавливаем начальную ширину
            updateWidth();
    
            // Обновляем ширину при каждом вводе
            textarea.addEventListener('input', updateWidth);
    
            // Обновляем ширину при загрузке
            window.addEventListener('load', updateWidth);
            this.textareaExpanding();
        }
    
        textareaExpanding() {
            // Код textareaExpanding() для этого кастомного элемента
            const textareas = this.querySelectorAll('.textarea');
            textareas.forEach(textarea => {
                textarea.addEventListener('input', () => {
                    // Реализация textareaExpanding() в контексте кастомного элемента
                });
            });
        }
    }

customElements.define('custom-checkbox-for-create', Custom_checkbox_for_create);

class Custom_radio_for_create extends HTMLElement {
    connectedCallback() {
        const text = this.textContent.trim();
        const group = this.getAttribute('group');
        const value = this.getAttribute('value');

        this.innerHTML = `
            <div>
                <label class="label">
                    <input id="radio1" type="radio" class="radiobutton" value="${value}" name="${group}" >
                    <span class="fake-radio"></span>
                    <textarea class="textarea" maxlength="100">${text}</textarea>
                    <img class="delete_answer" src="./svg/delete.svg">
                </label>
            </div>
        `;

        const textarea = this.querySelector('.textarea');
        const hiddenText = document.getElementById('hidden-text');

        const updateWidth = () => {
            hiddenText.textContent = textarea.value || textarea.placeholder;
            textarea.style.width = `${hiddenText.offsetWidth + 20}px`;
        };

        // Устанавливаем начальную ширину
        updateWidth();

        // Обновляем ширину при каждом вводе
        textarea.addEventListener('input', updateWidth);

        // Обновляем ширину при загрузке
        window.addEventListener('load', updateWidth);
        this.textareaExpanding();
    }

    textareaExpanding() {
        // Код textareaExpanding() для этого кастомного элемента
        const textareas = this.querySelectorAll('.textarea');
        textareas.forEach(textarea => {
            textarea.addEventListener('input', () => {
                // Реализация textareaExpanding() в контексте кастомного элемента
            });
        });
    }
}

customElements.define('custom-radiobutton-for-create', Custom_radio_for_create);

class Custom_button_red extends HTMLElement {
    connectedCallback() {
        const id_btn = this.getAttribute('id_btn');
        const text = this.textContent.trim();
        const disabled_value = this.getAttribute('disabled_value');
        this.innerHTML = `
        <button class="button_red" id="${id_btn}">${text}</button>
        `
    }
}

customElements.define('custom-button-red', Custom_button_red);

class Custom_button_white extends HTMLElement {
    connectedCallback() {
        const text = this.textContent.trim();
        const id_btn = this.getAttribute('id_btn');
        this.innerHTML = `
        
        <button class="button_white" id="${id_btn}">${text}</button>
        `
    }
}

customElements.define('custom-button-white', Custom_button_white);

class Custom_button_blue extends HTMLElement {
    connectedCallback() {
        const text = this.textContent.trim();
        const id_btn = this.getAttribute('id_btn');
        this.innerHTML = `
        
        <button class="button_blue" id="${id_btn}">${text}</button>
        `
    }
}

customElements.define('custom-button-blue', Custom_button_blue);

class Button_plus extends HTMLElement {
    connectedCallback() {
        const id_btn = this.getAttribute('id_btn');
        this.innerHTML = `
        <button class="button_plus" id="${id_btn}">
            <svg class="button_plus_svg" viewBox="0 0 38 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.5456 32.6257V18.0423M18.5456 18.0423V3.45898M18.5456 18.0423L2.50391 18.0423M18.5456 18.0423L34.5872 18.0423" stroke="white" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </button>
        `
    }
}
customElements.define('custom-button-plus', Button_plus);


class User_list extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <!-- <link rel="stylesheet" type="text/css" href="components/list.css"> -->
        <div class="list" id="listContainer">
            <template id="listTemplate">
                <div class="line" onclick="redirectToPage(this)">
                    <div class="user">
                        <div class="details">
                            <h2 class="name"></h2>
                        </div>

                    </div>
                    <div class="action">
                        <div class="profile" href="#">

                        </div>
                        <div class="delete" id="del" onclick="showDeletePopup(event, this.closest('.line').dataset.email)"></div>

                        </div>
                    </div>
                </div>
            </template>
        </div> `
    }
}

customElements.define('user-list', User_list);


class Task_list extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <!-- <link rel="stylesheet" type="text/css" href="components/list.css"> -->
        <div class="list" id="listContainer">
            <template id="listTemplate">
                <div class="line">
                    <div class="user">
                        <div class="details">
                            <h1 class="name"></h1>
                        </div>
                    </div>
                    <div class="action">
                        <div class="delete" id="del" onclick="showDeletePopup(event, this.closest('.line').dataset.index)"></div>
                    </div>
                </div>
            </template>
        </div>
        `
    }
}

customElements.define('task-list', Task_list);

class Practice_answer_list extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <!-- <link rel="stylesheet" type="text/css" href="components/list.css"> -->
        <div class="list" id="listContainer">
            <template id="listTemplate">
                <div class="line" onclick="redirectToPage(this)">
                    <div class="user">
                        <div class="details">
                            <h1 class="name"></h1>
                        </div>
                    </div>
                    <div class="action">
                        <div class="answer"></div>
                    </div>
                </div>
            </template>
        </div>
        `
    }
}

customElements.define('practice-answer-list', Practice_answer_list);
// class Pop_up extends HTMLElement {
//     connectedCallback() {
//         const text = this.textContent.trim();


//         this.innerHTML = `    
//         <button class="${class_btn}" id="open-modal-btn" disabled_value="${disabled_value}">${text}</button>
    
//         <!-- Модальное окно  -->
//         <div class="modal" id="exit-modal">
//             <div class="modal__box">
//                 <h3 class="modal__box-header">${header_text}</h3>
//                 <p class="modal__box-text">${question_text}</p>
//                 <div class="btn__box">
//                     <button class="button-red" id="No-btn">${text_btn1}</button>             
//                     <button class="button-blue" >${text_btn2}</button>
//                 </div>
//             </div>
//         </div>
//         `
//     }
// }
class Pop_up_create_task extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
    
        <!-- Модальное окно  -->
        <div class="modal" id="create_task_modal">
            <div class="modal__box">
                <h3 class="modal__box-header">Какой тип задания вы хотите создать?</h3>
                <div class="radio__box">
                <custom-radiobutton text="С открытым ответом" value="open_response" group="myGroup"></custom-radiobutton>
                    <custom-radiobutton text="Тест" value="test" group="myGroup"></custom-radiobutton>
                    <custom-radiobutton text="Лекция" value="lecture" group="myGroup"></custom-radiobutton>
                </div>
                <div class="btn__box">
                    <button class="button-red" id="create-no-btn" style="cursor: pointer">Отмена</button>             
                    <button class="button-blue" id="create-yes-btn" style="cursor: pointer">Создать</button>
                </div>
            </div>
        </div>
        `

        // Функция закрывает модальное окно при нажатии на кнопку "НЕТ"
        document.getElementById("create-no-btn").addEventListener("click", this.close_modal)
            
    }

    open_modal() {
        document.getElementById("create_task_modal").classList.add("open")
    }

    close_modal() {
        document.getElementById("create_task_modal").classList.remove("open")
    }
}

customElements.define('pop-up-create-task', Pop_up_create_task);

class Pop_up_btn extends HTMLElement {
    connectedCallback() {
        const text = this.textContent.trim();
        const question_text = this.getAttribute('question-text');
        const text_btn1 = this.getAttribute('text-btn1');
        const text_btn2 = this.getAttribute('text-btn2');
        const class_btn= this.getAttribute('class-btn');
        const header_text = this.getAttribute('header-text');
        const disabled_value = this.getAttribute('disabled_value');

        this.innerHTML = `    
        <button class="${class_btn}" id="open-modal-btn" disabled_value="${disabled_value}">${text}</button>
    
        <!-- Модальное окно  -->
        <div class="modal" id="exit-modal">
            <div class="modal__box">
                <h3 class="modal__box-header">${header_text}</h3>
                <p class="modal__box-text">${question_text}</p>
                <div class="btn__box">
                    <button class="button-red" id="No-btn">${text_btn1}</button>             
                    <button class="button-blue" >${text_btn2}</button>
                </div>
            </div>
        </div>
        `
    }
}

customElements.define('pop-up-btn', Pop_up_btn);

class Pop_up_OK extends HTMLElement {
    connectedCallback() {
        const ok_bt_func = this.getAttribute('ok_bt_func');
        const open_btn_id = this.getAttribute('open_btn_id');
        const header_text = this.getAttribute('header-text');
        const question_text = this.getAttribute('question-text');
        const text_btn = this.getAttribute('text-btn');

        this.innerHTML = `
    
        <!-- Модальное окно  -->
        <div class="modal" id="exit-modal-ok">
            <div class="modal__box-ok">
                <h3 class="modal__box-header">${header_text}</h3>
                <p class="modal__box-text" id="modal__box-text">${question_text}</p>
                <div class="btn__box Ok">            
                    <button class="button-red" id="Ok-btn" style="cursor: pointer">${text_btn}</button>
                </div>
            </div>
        </div>
        `

        // Функция открывает модальное окно при нажатии на кнопку
        if(open_btn_id!=null){
            document.getElementById(open_btn_id).addEventListener('click',this.open_modal)
        }

        // Функция закрывает модальное окно при нажатии на кнопку "Ок"
        document.getElementById("Ok-btn").addEventListener("click",()=>{window[ok_bt_func]()})   
    }

    open_modal() {
        document.getElementById("exit-modal-ok").classList.add("open")
    }

    close_modal() {
        document.getElementById("exit-modal").classList.remove("open")
    }
}

customElements.define('pop-up-ok', Pop_up_OK);

class Pop_up extends HTMLElement {
    connectedCallback() {
        const no_bt_func = this.getAttribute('no_bt_func');
        const yes_bt_func = this.getAttribute('yes_bt_func');
        const open_btn_id = this.getAttribute('open_btn_id');
        const header_text = this.getAttribute('header-text');
        const question_text = this.getAttribute('question-text');
        const text_btn1 = this.getAttribute('text-btn1');
        const text_btn2 = this.getAttribute('text-btn2');
        const id_modal = this.getAttribute('id_modal') || "exit-modal";
        const no_id = this.getAttribute('no_id') || "No-btn";
        const yes_id = this.getAttribute('yes_id') || "Yes-btn";

        this.innerHTML = `
    
        <!-- Модальное окно  -->
        <div class="modal" id=${id_modal}>
            <div class="modal__box">
                <h3 class="modal__box-header">${header_text}</h3>
                <p class="modal__box-text">${question_text}</p>
                <div class="btn__box">
                    <button class="button-red" id="${no_id}" style="cursor: pointer">${text_btn1}</button>             
                    <button class="button-blue" id="${yes_id}" style="cursor: pointer">${text_btn2}</button>
                </div>
            </div>
        </div>
        `

        // Функция открывает модальное окно при нажатии на кнопку
        if(open_btn_id!=null){
            document.getElementById(open_btn_id).addEventListener('click',this.open_modal)
        }

        // Функция закрывает модальное окно при нажатии на кнопку "НЕТ"
        document.getElementById(no_id).addEventListener("click",()=>{window[no_bt_func]()})

        // Функция закрывает модальное окно при нажатии на кнопку "Да"
        document.getElementById(yes_id).addEventListener("click",()=>{window[yes_bt_func]()})   
    }

    open_modal() {
        document.getElementById("exit-modal").classList.add("open")
    }

    close_modal() {
        document.getElementById("exit-modal").classList.remove("open")
    }

}

customElements.define('pop-up', Pop_up);

class Pop_up_header extends HTMLElement {
    connectedCallback() {
        const open_btn_id = this.getAttribute('open_btn_id');
        const header_text = this.getAttribute('header-text');
        const question_text = this.getAttribute('question-text');
        const text_btn1 = this.getAttribute('text-btn1');
        const text_btn2 = this.getAttribute('text-btn2');

        this.innerHTML = `
    
        <!-- Модальное окно  -->
        <div class="modal" id="exit-modal-header">
            <div class="modal__box">
                <h3 class="modal__box-header">${header_text}</h3>
                <p class="modal__box-text">${question_text}</p>
                <div class="btn__box">
                    <button class="button-red" id="No-btn-header" style="cursor: pointer">${text_btn1}</button>             
                    <button class="button-blue" id="Yes-btn-header" style="cursor: pointer">${text_btn2}</button>
                </div>
            </div>
        </div>
        `

        // Функция открывает модальное окно при нажатии на кнопку
        document.getElementById(open_btn_id).addEventListener('click',this.open_modal)

        // Функция закрывает модальное окно при нажатии на кнопку "НЕТ"
        document.getElementById("No-btn-header").addEventListener("click",this.close_modal)
            
    }

    open_modal() {
        document.getElementById("exit-modal-header").classList.add("open")
    }

    close_modal() {
        document.getElementById("exit-modal-header").classList.remove("open")
    }
}

customElements.define('pop-up-header', Pop_up_header);

class Header extends HTMLElement {
    connectedCallback() {
        const color_map = this.getAttribute('colorMap');
        const color_stat = this.getAttribute('colorStat');
        const color_inf = this.getAttribute('colorInf') || '#0F2232';
        const style_num = this.getAttribute('style_num') || "2";

        this.innerHTML = `
        <link rel="stylesheet" type="text/css" href="components/header_style${style_num}.css">
            <pop-up-header header-text="Внимание!" open_btn_id="logout" question-text="Вы точно хотите выйти из аккаунта?" text-btn1="Нет" text-btn2="Да"></pop-up-header>
            <header class="header">
                <a href="#" title="Главная">
                    <svg class="logo" viewBox="0 0 220 67" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M117.576 11.699C117.576 5.3678 112.464 0.27533 106.108 0.137695H84.5547V3.44092V33.3076H93.3972V23.2603H101.134L109.01 33.3076H118.405L109.977 22.5721C114.398 20.9205 117.576 16.6538 117.576 11.699ZM93.3972 7.43232H105.003H105.694H106.108C108.319 7.43232 110.253 9.3592 110.253 11.5614C110.253 13.7635 108.457 15.6904 106.246 15.6904H106.108L105.003 15.828H93.259L93.3972 7.43232Z" fill="#EC1C24"/>
                        <path d="M21.5536 0H0V33.1699H8.84251V23.1226H21.4155C27.771 23.1226 33.0213 17.8925 33.0213 11.5613C33.0213 5.36774 27.9092 0.137634 21.5536 0ZM21.5536 15.828H20.4483H8.84251V7.43226H20.5865H21.2773H21.6918C23.9024 7.43226 25.8367 9.35914 25.8367 11.5613C25.5604 13.9011 23.9024 15.6903 21.5536 15.828Z" fill="#EC1C24"/>
                        <path d="M59.8239 0H51.1195L36.3359 33.3075H45.0403L46.9746 29.0409H64.107L66.0413 33.3075H74.6074L59.8239 0ZM60.791 21.6086H50.1524L55.4026 9.77204L60.791 21.6086Z" fill="#EC1C24"/>
                        <path d="M210.701 33.3075H219.406L204.484 0H195.78L180.996 33.3075H189.7L191.635 29.0409H208.767L210.701 33.3075ZM194.813 21.6086L200.063 9.77204L205.313 21.6086H194.813Z" fill="#EC1C24"/>
                        <path d="M151.151 16.2409L139.822 0H131.117V33.3075H139.683V14.1763L151.151 30.2796L162.48 14.1763V33.3075H171.185V0H162.48L151.151 16.2409Z" fill="#EC1C24"/>
                        <path d="M212.635 49.1356C211.391 49.1356 210.01 49.2733 209.042 49.6862V57.8066C209.042 59.0453 210.7 59.7335 212.635 59.7335C215.674 59.7335 216.642 58.6324 216.642 54.5034C216.78 49.9614 215.813 49.1356 212.635 49.1356ZM212.635 61.2475C210.7 61.2475 209.733 60.6969 209.042 60.1464V65.7894H207.385V48.5851C208.766 47.8969 211.115 47.6216 212.635 47.6216C216.642 47.6216 218.576 49.1356 218.576 54.3657C218.576 59.5958 216.78 61.2475 212.635 61.2475ZM202.134 47.8969H203.792V60.284C202.272 60.9722 200.062 61.2475 198.542 61.2475C194.812 61.2475 193.43 59.8711 193.43 55.1915V47.8969H195.088V54.9163C195.088 58.9077 195.917 59.7335 198.818 59.7335C200.062 59.7335 201.167 59.5958 202.134 59.3206V47.8969ZM184.035 49.1356C187.074 49.1356 188.18 49.9614 188.18 54.5034C188.18 58.77 187.213 59.8711 184.035 59.8711C180.995 59.8711 180.028 58.77 180.028 54.5034C180.028 49.9614 180.995 49.1356 184.035 49.1356ZM184.035 61.2475C188.18 61.2475 189.976 59.5958 189.976 54.3657C189.976 48.998 188.042 47.6216 184.035 47.6216C180.028 47.6216 178.094 49.1356 178.094 54.3657C178.232 59.5958 180.028 61.2475 184.035 61.2475ZM175.054 47.484C173.12 47.484 171.876 48.1722 171.324 48.8604V47.8969H169.666V60.9722H171.324V51.0625C171.324 49.8238 172.982 49.4109 175.054 49.4109C175.607 49.4109 176.021 49.4109 176.436 49.5485V47.8969C175.883 47.6216 175.469 47.484 175.054 47.484ZM160.685 49.1356C161.928 49.1356 163.31 49.2733 164.277 49.6862V57.8066C164.277 59.0453 162.619 59.7335 160.685 59.7335C157.645 59.7335 156.678 58.6324 156.678 54.5034C156.678 49.9614 157.645 49.1356 160.685 49.1356ZM165.935 48.5851C164.554 47.8969 162.205 47.6216 160.685 47.6216C156.678 47.6216 154.744 49.1356 154.744 54.3657C154.744 59.7335 156.678 61.2475 160.685 61.2475C162.619 61.2475 163.586 60.6969 164.277 60.1464C164.277 63.5872 162.619 64.5507 159.442 64.5507C158.474 64.5507 156.678 64.2754 155.711 63.8625L155.158 65.5141C156.126 65.927 158.198 66.2023 159.303 66.2023C163.31 66.2023 165.797 64.8259 165.797 60.0087L165.935 48.5851ZM143.138 49.8238L143.691 48.1722C142.171 47.7593 140.651 47.484 139.408 47.484C135.954 47.484 134.296 48.4475 134.296 51.4754C134.296 53.9528 135.954 54.7786 139.131 54.9163C141.618 55.0539 142.309 55.7421 142.309 57.1184C142.309 59.1829 141.204 59.5958 139.131 59.5958C137.75 59.5958 135.815 59.1829 134.986 58.9077L134.434 60.4216C135.815 60.8346 137.888 61.1098 139.131 61.1098C142.586 61.1098 144.243 60.1464 144.243 56.9808C144.243 54.5034 142.724 53.4023 139.408 53.2647C137.059 53.127 136.092 52.5765 136.092 51.2001C136.092 49.1356 137.197 48.8604 139.408 48.8604C140.651 49.1356 142.033 49.4109 143.138 49.8238ZM126.282 49.1356C128.769 49.1356 129.598 49.8238 129.736 53.127H122.275C122.414 49.9614 123.381 49.1356 126.282 49.1356ZM126.282 47.484C122.414 47.484 120.479 49.1356 120.479 54.2281C120.479 59.5958 122.69 61.1098 126.558 61.1098C127.664 61.1098 129.46 60.8346 130.842 60.4216L130.427 58.9077C129.322 59.3206 127.664 59.5958 126.697 59.5958C123.657 59.5958 122.275 58.6324 122.275 54.5034H131.671C131.532 48.998 129.874 47.484 126.282 47.484ZM116.196 42.9421C115.367 42.9421 115.091 43.0797 115.091 43.9055C115.091 44.869 115.367 45.0066 116.196 45.0066C117.025 45.0066 117.301 44.869 117.301 43.9055C117.301 43.0797 117.025 42.9421 116.196 42.9421ZM117.025 60.9722H115.367V47.8969H117.025V60.9722ZM106.386 49.1356C107.63 49.1356 109.012 49.2733 109.979 49.6862V57.8066C109.979 59.0453 108.321 59.7335 106.386 59.7335C103.347 59.7335 102.38 58.6324 102.38 54.5034C102.38 49.9614 103.347 49.1356 106.386 49.1356ZM111.775 48.5851C110.393 47.8969 108.044 47.6216 106.525 47.6216C102.518 47.6216 100.584 49.1356 100.584 54.3657C100.584 59.7335 102.518 61.2475 106.525 61.2475C108.459 61.2475 109.426 60.6969 110.117 60.1464C110.117 63.5872 108.459 64.5507 105.281 64.5507C104.314 64.5507 102.518 64.2754 101.551 63.8625L100.998 65.3765C101.965 65.7894 104.038 66.0647 105.281 66.0647C109.288 66.0647 111.775 64.6883 111.775 59.8711V48.5851ZM91.6029 49.1356C94.6425 49.1356 95.7478 49.9614 95.7478 54.5034C95.7478 58.77 94.7807 59.8711 91.6029 59.8711C88.5633 59.8711 87.5961 58.77 87.5961 54.5034C87.5961 49.9614 88.5633 49.1356 91.6029 49.1356ZM91.6029 61.2475C95.7478 61.2475 97.544 59.5958 97.544 54.3657C97.544 48.998 95.6097 47.6216 91.6029 47.6216C87.5961 47.484 85.6618 48.998 85.6618 54.3657C85.6618 59.5958 87.5961 61.2475 91.6029 61.2475ZM82.3459 42.2539H80.6879V57.669C80.6879 59.5958 81.2406 60.4216 82.3459 61.3851L83.7275 60.284C82.7604 59.3206 82.4841 58.77 82.4841 57.5313L82.3459 42.2539ZM71.4309 49.1356C74.4705 49.1356 75.5759 49.9614 75.5759 54.5034C75.5759 58.77 74.6087 59.8711 71.4309 59.8711C68.3913 59.8711 67.4242 58.77 67.4242 54.5034C67.286 49.9614 68.2531 49.1356 71.4309 49.1356ZM71.4309 61.2475C75.5759 61.2475 77.372 59.5958 77.372 54.3657C77.372 48.998 75.4377 47.6216 71.4309 47.6216C67.4242 47.6216 65.4899 49.1356 65.4899 54.3657C65.4899 59.5958 67.286 61.2475 71.4309 61.2475ZM53.4696 49.5485C54.4367 49.2733 55.542 49.1356 56.7855 49.1356C59.687 49.1356 60.5159 49.9614 60.5159 53.9528V60.9722H62.1739V53.6776C62.1739 48.998 60.7923 47.6216 57.0618 47.6216C55.542 47.6216 53.1932 48.0345 51.8116 48.5851V60.9722H53.4696V49.5485ZM43.2454 47.484C41.5874 47.484 40.0676 48.0345 39.515 48.5851V42.2539H37.857V60.8345H39.515V50.9249C39.515 49.6862 41.3111 49.1356 43.1072 49.1356C45.7324 49.1356 46.5613 49.9614 46.5613 53.9528V60.9722H48.2193V53.6776C48.0812 48.8604 46.6995 47.484 43.2454 47.484ZM34.6792 59.0453C33.7121 59.4582 32.6068 59.7335 31.5014 59.7335C28.4618 59.7335 27.0802 58.6324 27.0802 54.5034C27.0802 50.0991 28.4618 49.2733 31.5014 49.2733C32.6068 49.2733 33.7121 49.4109 34.6792 49.8238L35.2319 48.3098C34.2647 47.8969 32.6068 47.6216 31.5014 47.6216C27.4947 47.6216 25.1459 49.1356 25.1459 54.3657C25.1459 59.7335 27.3565 61.2475 31.5014 61.2475C32.6068 61.2475 34.2647 60.9722 35.2319 60.5593L34.6792 59.0453ZM16.9942 49.1356C19.4812 49.1356 20.3101 49.8238 20.4483 53.127H12.9874C13.2638 49.9614 14.2309 49.1356 16.9942 49.1356ZM16.9942 47.484C13.1256 47.484 11.0531 49.2733 11.0531 54.3657C11.0531 59.7335 13.2638 61.2475 17.1324 61.2475C18.2377 61.2475 20.0338 60.9722 21.4155 60.5593L21.001 59.0453C19.8956 59.4582 18.2377 59.7335 17.2705 59.7335C14.2309 59.7335 12.8493 58.77 12.8493 54.641H22.2444C22.3826 48.998 20.7246 47.484 16.9942 47.484ZM4.00676 56.5679C4.00676 58.77 4.55942 59.7335 6.49372 59.7335C7.46087 59.7335 8.28986 59.5958 8.98068 59.3206L9.39517 60.8345C8.56618 61.1098 7.46087 61.2475 6.49372 61.2475C3.4541 61.2475 2.34879 60.4216 2.34879 56.5679V49.4109H0V47.8969H2.34879V45.1442L4.00676 44.4561V47.8969H8.84251V49.4109H4.00676V56.5679Z" fill="#898B8D"/>
                        </svg>                
                </a>
                <nav class="navbar">
                    <a title="Карта заданий" style="color: ${color_map};cursor: pointer" id="map">Карта заданий</a>
                    <a title="Статистика" style="color: ${color_stat};cursor: pointer" id="stat">Статистика</a>
                    <a id="lk" title="Личный кабинет" style="cursor: pointer">
                        <svg viewBox="0 0 55 57" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M41.5273 17.6481C41.5273 23.5392 36.9009 28.3148 31.194 28.3148C25.4871 28.3148 20.8607 23.5392 20.8607 17.6481C20.8607 11.7571 25.4871 6.98145 31.194 6.98145C36.9009 6.98145 41.5273 11.7571 41.5273 17.6481Z" stroke="${color_inf}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M41.5273 38.9814H20.8607C15.1537 38.9814 10.5273 43.7571 10.5273 49.6481C10.5273 52.5936 12.8405 54.9815 15.694 54.9815H46.694C49.5475 54.9815 51.8607 52.5936 51.8607 49.6481C51.8607 43.7571 47.2343 38.9814 41.5273 38.9814Z" stroke="${color_inf}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>                                       
                    </a>
                    <a id="logout" title="Выйти из аккаунта" class="open-modal-btn" style="cursor: pointer">
                        <svg viewBox="0 0 55 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M41.6819 20.625C43.9438 22.3214 45.9864 24.2894 47.7643 26.4835C48.0048 26.7802 48.125 27.1401 48.125 27.5M41.6819 34.375C43.9438 32.6786 45.9864 30.7106 47.7643 28.5165C48.0048 28.2198 48.125 27.8599 48.125 27.5M48.125 27.5H18.3333M29.7917 10.3762C27.359 8.19891 24.1466 6.875 20.625 6.875C13.0311 6.875 6.875 13.0311 6.875 20.625V34.375C6.875 41.9689 13.0311 48.125 20.625 48.125C24.1466 48.125 27.359 46.8011 29.7917 44.6238" stroke="#0F2232" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>                    
                    </a>
                </nav>
            </header>
        `

        this.querySelector('#map').addEventListener('click', this.map)
        this.querySelector('#stat').addEventListener('click', this.stat)
        this.querySelector('#lk').addEventListener('click', this.lk)
        this.querySelector('#Yes-btn-header').addEventListener('click', this.deadInf)
    }
    map() {
        window.location.href = "http://127.0.0.1:8000/map"
    }
    stat() {
        window.location.href = "http://127.0.0.1:8000/statistic"
    }

    lk() {
        window.location.href = "http://127.0.0.1:8000/account"
    }

    async deadInf() {
        document.getElementById("exit-modal-header").classList.remove("open")
        const URL = `${window.location.origin}/script/logout-cookie`;
        try {
          await axios.get(URL);
        } catch (error) {
          console.log(error);
        }
        location.reload();
      }
}



customElements.define('custom-header', Header);

class AdminHeader extends HTMLElement {
    connectedCallback() {
        const color_stat = this.getAttribute('colorStat');
        const color_users = this.getAttribute('colorUsers');
        const color_quest = this.getAttribute('colorQuest');
        const color_inf = this.getAttribute('colorInf') || '#0F2232';
        const style_num = this.getAttribute('style_num') || "2";
        this.innerHTML = `
        <link rel="stylesheet" type="text/css" href="components/header_style${style_num}.css">
            <pop-up-header header-text="Внимание!" open_btn_id="logout" question-text="Вы точно хотите выйти из аккаунта?" text-btn1="Нет" text-btn2="Да"></pop-up-header>
            <header class="header">
                <a href="#" title="Главная">
                    <svg class="logo" viewBox="0 0 220 67" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M117.576 11.699C117.576 5.3678 112.464 0.27533 106.108 0.137695H84.5547V3.44092V33.3076H93.3972V23.2603H101.134L109.01 33.3076H118.405L109.977 22.5721C114.398 20.9205 117.576 16.6538 117.576 11.699ZM93.3972 7.43232H105.003H105.694H106.108C108.319 7.43232 110.253 9.3592 110.253 11.5614C110.253 13.7635 108.457 15.6904 106.246 15.6904H106.108L105.003 15.828H93.259L93.3972 7.43232Z" fill="#EC1C24"/>
                        <path d="M21.5536 0H0V33.1699H8.84251V23.1226H21.4155C27.771 23.1226 33.0213 17.8925 33.0213 11.5613C33.0213 5.36774 27.9092 0.137634 21.5536 0ZM21.5536 15.828H20.4483H8.84251V7.43226H20.5865H21.2773H21.6918C23.9024 7.43226 25.8367 9.35914 25.8367 11.5613C25.5604 13.9011 23.9024 15.6903 21.5536 15.828Z" fill="#EC1C24"/>
                        <path d="M59.8239 0H51.1195L36.3359 33.3075H45.0403L46.9746 29.0409H64.107L66.0413 33.3075H74.6074L59.8239 0ZM60.791 21.6086H50.1524L55.4026 9.77204L60.791 21.6086Z" fill="#EC1C24"/>
                        <path d="M210.701 33.3075H219.406L204.484 0H195.78L180.996 33.3075H189.7L191.635 29.0409H208.767L210.701 33.3075ZM194.813 21.6086L200.063 9.77204L205.313 21.6086H194.813Z" fill="#EC1C24"/>
                        <path d="M151.151 16.2409L139.822 0H131.117V33.3075H139.683V14.1763L151.151 30.2796L162.48 14.1763V33.3075H171.185V0H162.48L151.151 16.2409Z" fill="#EC1C24"/>
                        <path d="M212.635 49.1356C211.391 49.1356 210.01 49.2733 209.042 49.6862V57.8066C209.042 59.0453 210.7 59.7335 212.635 59.7335C215.674 59.7335 216.642 58.6324 216.642 54.5034C216.78 49.9614 215.813 49.1356 212.635 49.1356ZM212.635 61.2475C210.7 61.2475 209.733 60.6969 209.042 60.1464V65.7894H207.385V48.5851C208.766 47.8969 211.115 47.6216 212.635 47.6216C216.642 47.6216 218.576 49.1356 218.576 54.3657C218.576 59.5958 216.78 61.2475 212.635 61.2475ZM202.134 47.8969H203.792V60.284C202.272 60.9722 200.062 61.2475 198.542 61.2475C194.812 61.2475 193.43 59.8711 193.43 55.1915V47.8969H195.088V54.9163C195.088 58.9077 195.917 59.7335 198.818 59.7335C200.062 59.7335 201.167 59.5958 202.134 59.3206V47.8969ZM184.035 49.1356C187.074 49.1356 188.18 49.9614 188.18 54.5034C188.18 58.77 187.213 59.8711 184.035 59.8711C180.995 59.8711 180.028 58.77 180.028 54.5034C180.028 49.9614 180.995 49.1356 184.035 49.1356ZM184.035 61.2475C188.18 61.2475 189.976 59.5958 189.976 54.3657C189.976 48.998 188.042 47.6216 184.035 47.6216C180.028 47.6216 178.094 49.1356 178.094 54.3657C178.232 59.5958 180.028 61.2475 184.035 61.2475ZM175.054 47.484C173.12 47.484 171.876 48.1722 171.324 48.8604V47.8969H169.666V60.9722H171.324V51.0625C171.324 49.8238 172.982 49.4109 175.054 49.4109C175.607 49.4109 176.021 49.4109 176.436 49.5485V47.8969C175.883 47.6216 175.469 47.484 175.054 47.484ZM160.685 49.1356C161.928 49.1356 163.31 49.2733 164.277 49.6862V57.8066C164.277 59.0453 162.619 59.7335 160.685 59.7335C157.645 59.7335 156.678 58.6324 156.678 54.5034C156.678 49.9614 157.645 49.1356 160.685 49.1356ZM165.935 48.5851C164.554 47.8969 162.205 47.6216 160.685 47.6216C156.678 47.6216 154.744 49.1356 154.744 54.3657C154.744 59.7335 156.678 61.2475 160.685 61.2475C162.619 61.2475 163.586 60.6969 164.277 60.1464C164.277 63.5872 162.619 64.5507 159.442 64.5507C158.474 64.5507 156.678 64.2754 155.711 63.8625L155.158 65.5141C156.126 65.927 158.198 66.2023 159.303 66.2023C163.31 66.2023 165.797 64.8259 165.797 60.0087L165.935 48.5851ZM143.138 49.8238L143.691 48.1722C142.171 47.7593 140.651 47.484 139.408 47.484C135.954 47.484 134.296 48.4475 134.296 51.4754C134.296 53.9528 135.954 54.7786 139.131 54.9163C141.618 55.0539 142.309 55.7421 142.309 57.1184C142.309 59.1829 141.204 59.5958 139.131 59.5958C137.75 59.5958 135.815 59.1829 134.986 58.9077L134.434 60.4216C135.815 60.8346 137.888 61.1098 139.131 61.1098C142.586 61.1098 144.243 60.1464 144.243 56.9808C144.243 54.5034 142.724 53.4023 139.408 53.2647C137.059 53.127 136.092 52.5765 136.092 51.2001C136.092 49.1356 137.197 48.8604 139.408 48.8604C140.651 49.1356 142.033 49.4109 143.138 49.8238ZM126.282 49.1356C128.769 49.1356 129.598 49.8238 129.736 53.127H122.275C122.414 49.9614 123.381 49.1356 126.282 49.1356ZM126.282 47.484C122.414 47.484 120.479 49.1356 120.479 54.2281C120.479 59.5958 122.69 61.1098 126.558 61.1098C127.664 61.1098 129.46 60.8346 130.842 60.4216L130.427 58.9077C129.322 59.3206 127.664 59.5958 126.697 59.5958C123.657 59.5958 122.275 58.6324 122.275 54.5034H131.671C131.532 48.998 129.874 47.484 126.282 47.484ZM116.196 42.9421C115.367 42.9421 115.091 43.0797 115.091 43.9055C115.091 44.869 115.367 45.0066 116.196 45.0066C117.025 45.0066 117.301 44.869 117.301 43.9055C117.301 43.0797 117.025 42.9421 116.196 42.9421ZM117.025 60.9722H115.367V47.8969H117.025V60.9722ZM106.386 49.1356C107.63 49.1356 109.012 49.2733 109.979 49.6862V57.8066C109.979 59.0453 108.321 59.7335 106.386 59.7335C103.347 59.7335 102.38 58.6324 102.38 54.5034C102.38 49.9614 103.347 49.1356 106.386 49.1356ZM111.775 48.5851C110.393 47.8969 108.044 47.6216 106.525 47.6216C102.518 47.6216 100.584 49.1356 100.584 54.3657C100.584 59.7335 102.518 61.2475 106.525 61.2475C108.459 61.2475 109.426 60.6969 110.117 60.1464C110.117 63.5872 108.459 64.5507 105.281 64.5507C104.314 64.5507 102.518 64.2754 101.551 63.8625L100.998 65.3765C101.965 65.7894 104.038 66.0647 105.281 66.0647C109.288 66.0647 111.775 64.6883 111.775 59.8711V48.5851ZM91.6029 49.1356C94.6425 49.1356 95.7478 49.9614 95.7478 54.5034C95.7478 58.77 94.7807 59.8711 91.6029 59.8711C88.5633 59.8711 87.5961 58.77 87.5961 54.5034C87.5961 49.9614 88.5633 49.1356 91.6029 49.1356ZM91.6029 61.2475C95.7478 61.2475 97.544 59.5958 97.544 54.3657C97.544 48.998 95.6097 47.6216 91.6029 47.6216C87.5961 47.484 85.6618 48.998 85.6618 54.3657C85.6618 59.5958 87.5961 61.2475 91.6029 61.2475ZM82.3459 42.2539H80.6879V57.669C80.6879 59.5958 81.2406 60.4216 82.3459 61.3851L83.7275 60.284C82.7604 59.3206 82.4841 58.77 82.4841 57.5313L82.3459 42.2539ZM71.4309 49.1356C74.4705 49.1356 75.5759 49.9614 75.5759 54.5034C75.5759 58.77 74.6087 59.8711 71.4309 59.8711C68.3913 59.8711 67.4242 58.77 67.4242 54.5034C67.286 49.9614 68.2531 49.1356 71.4309 49.1356ZM71.4309 61.2475C75.5759 61.2475 77.372 59.5958 77.372 54.3657C77.372 48.998 75.4377 47.6216 71.4309 47.6216C67.4242 47.6216 65.4899 49.1356 65.4899 54.3657C65.4899 59.5958 67.286 61.2475 71.4309 61.2475ZM53.4696 49.5485C54.4367 49.2733 55.542 49.1356 56.7855 49.1356C59.687 49.1356 60.5159 49.9614 60.5159 53.9528V60.9722H62.1739V53.6776C62.1739 48.998 60.7923 47.6216 57.0618 47.6216C55.542 47.6216 53.1932 48.0345 51.8116 48.5851V60.9722H53.4696V49.5485ZM43.2454 47.484C41.5874 47.484 40.0676 48.0345 39.515 48.5851V42.2539H37.857V60.8345H39.515V50.9249C39.515 49.6862 41.3111 49.1356 43.1072 49.1356C45.7324 49.1356 46.5613 49.9614 46.5613 53.9528V60.9722H48.2193V53.6776C48.0812 48.8604 46.6995 47.484 43.2454 47.484ZM34.6792 59.0453C33.7121 59.4582 32.6068 59.7335 31.5014 59.7335C28.4618 59.7335 27.0802 58.6324 27.0802 54.5034C27.0802 50.0991 28.4618 49.2733 31.5014 49.2733C32.6068 49.2733 33.7121 49.4109 34.6792 49.8238L35.2319 48.3098C34.2647 47.8969 32.6068 47.6216 31.5014 47.6216C27.4947 47.6216 25.1459 49.1356 25.1459 54.3657C25.1459 59.7335 27.3565 61.2475 31.5014 61.2475C32.6068 61.2475 34.2647 60.9722 35.2319 60.5593L34.6792 59.0453ZM16.9942 49.1356C19.4812 49.1356 20.3101 49.8238 20.4483 53.127H12.9874C13.2638 49.9614 14.2309 49.1356 16.9942 49.1356ZM16.9942 47.484C13.1256 47.484 11.0531 49.2733 11.0531 54.3657C11.0531 59.7335 13.2638 61.2475 17.1324 61.2475C18.2377 61.2475 20.0338 60.9722 21.4155 60.5593L21.001 59.0453C19.8956 59.4582 18.2377 59.7335 17.2705 59.7335C14.2309 59.7335 12.8493 58.77 12.8493 54.641H22.2444C22.3826 48.998 20.7246 47.484 16.9942 47.484ZM4.00676 56.5679C4.00676 58.77 4.55942 59.7335 6.49372 59.7335C7.46087 59.7335 8.28986 59.5958 8.98068 59.3206L9.39517 60.8345C8.56618 61.1098 7.46087 61.2475 6.49372 61.2475C3.4541 61.2475 2.34879 60.4216 2.34879 56.5679V49.4109H0V47.8969H2.34879V45.1442L4.00676 44.4561V47.8969H8.84251V49.4109H4.00676V56.5679Z" fill="#898B8D"/>
                        </svg>                
                </a>
                <nav class="navbar">
                    <a title="Статистика" style="color: ${color_stat};cursor: pointer" id="admin_stat">Статистика</a>
                    <a title="Пользователи" style="color: ${color_users};cursor: pointer" id="users">Пользователи</a>
                    <a title="Квест" style="color: ${color_quest};cursor: pointer" id="quest">Квест</a>
                    <a id="lk" title="Личный кабинет" style="cursor: pointer">
                        <svg viewBox="0 0 55 57" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M41.5273 17.6481C41.5273 23.5392 36.9009 28.3148 31.194 28.3148C25.4871 28.3148 20.8607 23.5392 20.8607 17.6481C20.8607 11.7571 25.4871 6.98145 31.194 6.98145C36.9009 6.98145 41.5273 11.7571 41.5273 17.6481Z" stroke="${color_inf}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M41.5273 38.9814H20.8607C15.1537 38.9814 10.5273 43.7571 10.5273 49.6481C10.5273 52.5936 12.8405 54.9815 15.694 54.9815H46.694C49.5475 54.9815 51.8607 52.5936 51.8607 49.6481C51.8607 43.7571 47.2343 38.9814 41.5273 38.9814Z" stroke="${color_inf}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>                                       
                    </a>
                    <a id="logout" title="Выйти из аккаунта" class="open-modal-btn" style="cursor: pointer">
                        <svg viewBox="0 0 55 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M41.6819 20.625C43.9438 22.3214 45.9864 24.2894 47.7643 26.4835C48.0048 26.7802 48.125 27.1401 48.125 27.5M41.6819 34.375C43.9438 32.6786 45.9864 30.7106 47.7643 28.5165C48.0048 28.2198 48.125 27.8599 48.125 27.5M48.125 27.5H18.3333M29.7917 10.3762C27.359 8.19891 24.1466 6.875 20.625 6.875C13.0311 6.875 6.875 13.0311 6.875 20.625V34.375C6.875 41.9689 13.0311 48.125 20.625 48.125C24.1466 48.125 27.359 46.8011 29.7917 44.6238" stroke="#0F2232" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>                    
                    </a>
                </nav>
            </header>
        `

        this.querySelector('#admin_stat').addEventListener('click', this.admin_stat)
        this.querySelector('#users').addEventListener('click', this.users)
        this.querySelector('#quest').addEventListener('click', this.quest)
        this.querySelector('#lk').addEventListener('click', this.lk)
        this.querySelector('#Yes-btn-header').addEventListener('click', this.deadInf)
    }
    admin_stat() {
        window.location.href = "http://127.0.0.1:8000/admin_statistic"
    }
    users() {
        window.location.href = "http://127.0.0.1:8000/user_list"
    }
    quest() {
        window.location.href = "http://127.0.0.1:8000/task_list"
    }

    lk() {
        window.location.href = "http://127.0.0.1:8000/admin_account"
    }

    async deadInf() {
        document.getElementById("exit-modal-header").classList.remove("open")
        const URL = `${window.location.origin}/script/logout-cookie`;
        try {
          await axios.get(URL);
        } catch (error) {
          console.log(error);
        }
        location.reload();
      }
}



customElements.define('custom-admin_header', AdminHeader);

class Sidebar extends HTMLElement {
    connectedCallback() {
        const style_num = this.getAttribute('style_num') || "2";
        this.innerHTML = `
            <link rel="stylesheet" type="text/css" href="components/sidebar_style${style_num}.css">
            <nav class="nav_open" id="sidebar">
            <button class="close_menu_btn" onclick="close_menu()">
                <svg viewBox="0 0 64 59" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23.5477 44.25C17.9387 40.4259 12.9009 35.9586 8.55872 30.961C8.18624 30.5323 8 30.0162 8 29.5M23.5477 14.75C17.9387 18.5741 12.9009 23.0414 8.55872 28.039C8.18624 28.4677 8 28.9838 8 29.5M8 29.5L56 29.5" stroke="#0F2232" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>                
            </button>
            <ul>
                <li><a href="#" class="see_answers" onclick="answers()">
                    <svg viewBox="0 0 31 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M3.875 0C1.7349 0 0 1.74609 0 3.9V35.1C0 37.2539 1.7349 39 3.875 39H27.125C29.2651 39 31 37.2539 31 35.1V3.9C31 1.74609 29.2651 0 27.125 0H3.875ZM3.875 3.9L27.125 3.9V35.1H3.875V3.9ZM9.6875 9.75C8.61745 9.75 7.75 10.623 7.75 11.7C7.75 12.777 8.61745 13.65 9.6875 13.65H13.5625C14.6326 13.65 15.5 12.777 15.5 11.7C15.5 10.623 14.6326 9.75 13.5625 9.75H9.6875ZM7.75 19.5C7.75 18.423 8.61745 17.55 9.6875 17.55H17.4375C18.5076 17.55 19.375 18.423 19.375 19.5C19.375 20.577 18.5076 21.45 17.4375 21.45H9.6875C8.61745 21.45 7.75 20.577 7.75 19.5ZM9.6875 25.35C8.61745 25.35 7.75 26.223 7.75 27.3C7.75 28.377 8.61745 29.25 9.6875 29.25H21.3125C22.3826 29.25 23.25 28.377 23.25 27.3C23.25 26.223 22.3826 25.35 21.3125 25.35H9.6875Z" fill="#0F2232"/>
                        </svg>    
                    Посмотреть ответы
                </a></li>
                <li><a href="#" class="edit" onclick="edit()">
                    <svg viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M3.7456 0C1.67696 0 0 1.70132 0 3.8V34.2C0 36.2987 1.67696 38 3.7456 38H33.7104C35.7791 38 37.456 36.2987 37.456 34.2V26.6C37.456 25.5507 36.6175 24.7 35.5832 24.7C34.5489 24.7 33.7104 25.5507 33.7104 26.6V34.2H3.7456V3.8H18.728C19.7623 3.8 20.6008 2.94934 20.6008 1.9C20.6008 0.850659 19.7623 0 18.728 0H3.7456ZM33.8369 1.6792C32.3817 0.427874 30.2321 0.485874 28.8446 1.81389L10.1628 19.6948C9.70534 20.1326 9.36394 20.6802 9.17003 21.2871L7.80015 25.5744C6.79666 28.715 9.94654 31.5705 12.9102 30.2069L17.3029 28.1859C17.6796 28.0125 18.0254 27.7771 18.3262 27.4892L36.8247 9.78377C38.4494 8.22881 38.3801 5.58612 36.6763 4.12096L33.8369 1.6792ZM31.4149 4.57795L34.2544 7.01971L15.7559 24.7251L11.3632 26.7462L12.7331 22.4588L31.4149 4.57795Z" fill="#0F2232"/>
                        </svg>  
                    Редактировать          
                </a></li>
            </ul>
            <a href="#" class="logo">
                <svg viewBox="0 0 67 220" fill="none" xmlns="http://www.w3.org/2000/svg">                        <path d="M11.698 102.422C5.36683 102.422 0.274353 107.534 0.136719 113.89L0.136719 135.443H3.43994H33.3066V126.601H23.2593V118.864L33.3066 110.988V101.593L22.5711 110.021C20.9195 105.6 16.6528 102.422 11.698 102.422ZM7.43134 126.601V114.995V114.304V113.89C7.43134 111.679 9.35822 109.745 11.5604 109.745C13.7625 109.745 15.6894 111.541 15.6894 113.752V113.89L15.827 114.995L15.827 126.739L7.43134 126.601Z" fill="#EC1C24"/>
                    <path d="M0 198.446L0 220H33.1699V211.157H23.1226V198.585C23.1226 192.229 17.8925 186.979 11.5613 186.979C5.36774 186.979 0.137634 192.091 0 198.446ZM15.828 198.446V199.552L15.828 211.157H7.43226V199.414V198.723V198.308C7.43226 196.098 9.35914 194.163 11.5613 194.163C13.9011 194.44 15.6903 196.098 15.828 198.446Z" fill="#EC1C24"/>
                    <path d="M0 160.175L0 168.88L33.3075 183.663V174.959L29.0409 173.024V155.892L33.3075 153.958V145.392L0 160.175ZM21.6086 159.208V169.847L9.77204 164.596L21.6086 159.208Z" fill="#EC1C24"/>
                    <path d="M33.3075 9.29957V0.595238L0 15.517L0 24.2213L33.3075 39.0049V30.3006L29.0409 28.3662V11.2339L33.3075 9.29957ZM21.6086 25.1885L9.77204 19.9382L21.6086 14.688V25.1885Z" fill="#EC1C24"/>
                    <path d="M16.2409 68.848L0 80.1775L0 88.8818H33.3075V80.3157H14.1763L30.2796 68.848L14.1763 57.5186H33.3075V48.8142H0L0 57.5186L16.2409 68.848Z" fill="#EC1C24"/>
                    <path d="M49.1356 7.36523C49.1356 8.60872 49.2733 9.99036 49.6862 10.9575H57.8066C59.0453 10.9575 59.7335 9.29953 59.7335 7.36523C59.7335 4.32562 58.6324 3.35847 54.5034 3.35847C49.9614 3.22032 49.1356 4.18745 49.1356 7.36523ZM61.2475 7.36523C61.2475 9.29953 60.6969 10.2667 60.1464 10.9575H65.7894V12.6155H48.5851C47.8969 11.2338 47.6216 8.88504 47.6216 7.36523C47.6216 3.35847 49.1356 1.42416 54.3657 1.42416C59.5958 1.42416 61.2475 3.22031 61.2475 7.36523ZM47.8969 17.8657V16.2077H60.284C60.9722 17.7275 61.2475 19.9382 61.2475 21.458C61.2475 25.1884 59.8711 26.5701 55.1915 26.5701H47.8969V24.9121H54.9163C58.9077 24.9121 59.7335 24.0831 59.7335 21.1817C59.7335 19.9382 59.5958 18.8329 59.3206 17.8657H47.8969ZM49.1356 35.9652C49.1356 32.9256 49.9614 31.8203 54.5034 31.8203C58.77 31.8203 59.8711 32.7874 59.8711 35.9652C59.8711 39.0048 58.77 39.972 54.5034 39.972C49.9614 39.972 49.1356 39.0048 49.1356 35.9652ZM61.2475 35.9652C61.2475 31.8203 59.5958 30.0242 54.3657 30.0242C48.998 30.0242 47.6216 31.9585 47.6216 35.9652C47.6216 39.972 49.1356 41.9063 54.3657 41.9063C59.5958 41.7681 61.2475 39.972 61.2475 35.9652ZM47.484 44.9459C47.484 46.8802 48.1722 48.1237 48.8604 48.6763H47.8969V50.3343H60.9722V48.6763H51.0625C49.8238 48.6763 49.4109 47.0184 49.4109 44.9459C49.4109 44.3932 49.4109 43.9787 49.5485 43.5643H47.8969C47.6216 44.1169 47.484 44.5314 47.484 44.9459ZM49.1356 59.315C49.1356 58.0715 49.2733 56.6899 49.6862 55.7227H57.8066C59.0453 55.7227 59.7335 57.3807 59.7335 59.315C59.7335 62.3546 58.6324 63.3217 54.5034 63.3217C49.9614 63.3217 49.1356 62.3546 49.1356 59.315ZM48.5851 54.0647C47.8969 55.4464 47.6216 57.7952 47.6216 59.315C47.6216 63.3217 49.1356 65.256 54.3657 65.256C59.7335 65.256 61.2475 63.3217 61.2475 59.315C61.2475 57.3807 60.6969 56.4135 60.1464 55.7227C63.5872 55.7227 64.5507 57.3807 64.5507 60.5585C64.5507 61.5256 64.2754 63.3217 63.8625 64.2889L65.5141 64.8416C65.927 63.8744 66.2023 61.8019 66.2023 60.6966C66.2023 56.6899 64.8259 54.2029 60.0087 54.2029L48.5851 54.0647ZM49.8238 76.8618L48.1722 76.3092C47.7593 77.829 47.484 79.3488 47.484 80.5923C47.484 84.0464 48.4475 85.7043 51.4754 85.7043C53.9528 85.7043 54.7786 84.0464 54.9163 80.8686C55.0539 78.3816 55.7421 77.6908 57.1184 77.6908C59.1829 77.6908 59.5958 78.7961 59.5958 80.8686C59.5958 82.2502 59.1829 84.1845 58.9077 85.0135L60.4216 85.5662C60.8346 84.1845 61.1098 82.1121 61.1098 80.8686C61.1098 77.4145 60.1464 75.7565 56.9808 75.7565C54.5034 75.7565 53.4023 77.2763 53.2647 80.5923C53.127 82.9411 52.5765 83.9082 51.2001 83.9082C49.1356 83.9082 48.8604 82.8029 48.8604 80.5923C49.1356 79.3488 49.4109 77.9672 49.8238 76.8618ZM49.1356 93.7179C49.1356 91.2309 49.8238 90.4019 53.127 90.2638V97.7246C49.9614 97.5865 49.1356 96.6193 49.1356 93.7179ZM47.484 93.7179C47.484 97.5865 49.1356 99.5208 54.2281 99.5208C59.5958 99.5208 61.1098 97.3102 61.1098 93.4416C61.1098 92.3362 60.8346 90.5401 60.4216 89.1584L58.9077 89.573C59.3206 90.6783 59.5958 92.3362 59.5958 93.3034C59.5958 96.343 58.6324 97.7246 54.5034 97.7246V88.3295C48.998 88.4676 47.484 90.1256 47.484 93.7179ZM42.9421 103.804C42.9421 104.633 43.0797 104.909 43.9055 104.909C44.869 104.909 45.0066 104.633 45.0066 103.804C45.0066 102.975 44.869 102.699 43.9055 102.699C43.0797 102.699 42.9421 102.975 42.9421 103.804ZM60.9722 102.975V104.633H47.8969V102.975H60.9722ZM49.1356 113.614C49.1356 112.37 49.2733 110.988 49.6862 110.021H57.8066C59.0453 110.021 59.7335 111.679 59.7335 113.614C59.7335 116.653 58.6324 117.62 54.5034 117.62C49.9614 117.62 49.1356 116.653 49.1356 113.614ZM48.5851 108.225C47.8969 109.607 47.6216 111.956 47.6216 113.475C47.6216 117.482 49.1356 119.416 54.3657 119.416C59.7335 119.416 61.2475 117.482 61.2475 113.475C61.2475 111.541 60.6969 110.574 60.1464 109.883C63.5872 109.883 64.5507 111.541 64.5507 114.719C64.5507 115.686 64.2754 117.482 63.8625 118.449L65.3765 119.002C65.7894 118.035 66.0647 115.962 66.0647 114.719C66.0647 110.712 64.6883 108.225 59.8711 108.225H48.5851ZM49.1356 128.397C49.1356 125.357 49.9614 124.252 54.5034 124.252C58.77 124.252 59.8711 125.219 59.8711 128.397C59.8711 131.437 58.77 132.404 54.5034 132.404C49.9614 132.404 49.1356 131.437 49.1356 128.397ZM61.2475 128.397C61.2475 124.252 59.5958 122.456 54.3657 122.456C48.998 122.456 47.6216 124.39 47.6216 128.397C47.484 132.404 48.998 134.338 54.3657 134.338C59.5958 134.338 61.2475 132.404 61.2475 128.397ZM42.2539 137.654V139.312H57.669C59.5958 139.312 60.4216 138.759 61.3851 137.654L60.284 136.272C59.3206 137.24 58.77 137.516 57.5313 137.516L42.2539 137.654ZM49.1356 148.569C49.1356 145.529 49.9614 144.424 54.5034 144.424C58.77 144.424 59.8711 145.391 59.8711 148.569C59.8711 151.609 58.77 152.576 54.5034 152.576C49.9614 152.714 49.1356 151.747 49.1356 148.569ZM61.2475 148.569C61.2475 144.424 59.5958 142.628 54.3657 142.628C48.998 142.628 47.6216 144.562 47.6216 148.569C47.6216 152.576 49.1356 154.51 54.3657 154.51C59.5958 154.51 61.2475 152.714 61.2475 148.569ZM49.5485 166.53C49.2733 165.563 49.1356 164.458 49.1356 163.214C49.1356 160.313 49.9614 159.484 53.9528 159.484H60.9722V157.826H53.6776C48.998 157.826 47.6216 159.208 47.6216 162.938C47.6216 164.458 48.0345 166.807 48.5851 168.188H60.9722V166.53H49.5485ZM47.484 176.755C47.484 178.413 48.0345 179.932 48.5851 180.485H42.2539V182.143H60.8345V180.485H50.9249C49.6862 180.485 49.1356 178.689 49.1356 176.893C49.1356 174.268 49.9614 173.439 53.9528 173.439H60.9722V171.781H53.6776C48.8604 171.919 47.484 173.3 47.484 176.755ZM59.0453 185.321C59.4582 186.288 59.7335 187.393 59.7335 188.499C59.7335 191.538 58.6324 192.92 54.5034 192.92C50.0991 192.92 49.2733 191.538 49.2733 188.499C49.2733 187.393 49.4109 186.288 49.8238 185.321L48.3098 184.768C47.8969 185.735 47.6216 187.393 47.6216 188.499C47.6216 192.505 49.1356 194.854 54.3657 194.854C59.7335 194.854 61.2475 192.643 61.2475 188.499C61.2475 187.393 60.9722 185.735 60.5593 184.768L59.0453 185.321ZM49.1356 203.006C49.1356 200.519 49.8238 199.69 53.127 199.552V207.013C49.9614 206.736 49.1356 205.769 49.1356 203.006ZM47.484 203.006C47.484 206.874 49.2733 208.947 54.3657 208.947C59.7335 208.947 61.2475 206.736 61.2475 202.868C61.2475 201.762 60.9722 199.966 60.5593 198.585L59.0453 198.999C59.4582 200.104 59.7335 201.762 59.7335 202.729C59.7335 205.769 58.77 207.151 54.641 207.151V197.756C48.998 197.617 47.484 199.275 47.484 203.006ZM56.5679 215.993C58.77 215.993 59.7335 215.441 59.7335 213.506C59.7335 212.539 59.5958 211.71 59.3206 211.019L60.8345 210.605C61.1098 211.434 61.2475 212.539 61.2475 213.506C61.2475 216.546 60.4216 217.651 56.5679 217.651H49.4109V220H47.8969V217.651H45.1442L44.4561 215.993H47.8969V211.157H49.4109V215.993H56.5679Z" fill="#898B8D"/>
                    </svg>
            </a>          
            </nav>
            <nav class="nav_close" id="no-sidebar">
                <button class="open_menu_btn" onclick="open_menu()">
                    <svg viewBox="0 0 51 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 18H48" stroke="#0F2232" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M3 3H48" stroke="#0F2232" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M3 33H48" stroke="#0F2232" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                </button>
                <a href="#" class="logo">
                    <svg viewBox="0 0 67 220" fill="none" xmlns="http://www.w3.org/2000/svg">                        <path d="M11.698 102.422C5.36683 102.422 0.274353 107.534 0.136719 113.89L0.136719 135.443H3.43994H33.3066V126.601H23.2593V118.864L33.3066 110.988V101.593L22.5711 110.021C20.9195 105.6 16.6528 102.422 11.698 102.422ZM7.43134 126.601V114.995V114.304V113.89C7.43134 111.679 9.35822 109.745 11.5604 109.745C13.7625 109.745 15.6894 111.541 15.6894 113.752V113.89L15.827 114.995L15.827 126.739L7.43134 126.601Z" fill="#EC1C24"/>
                        <path d="M0 198.446L0 220H33.1699V211.157H23.1226V198.585C23.1226 192.229 17.8925 186.979 11.5613 186.979C5.36774 186.979 0.137634 192.091 0 198.446ZM15.828 198.446V199.552L15.828 211.157H7.43226V199.414V198.723V198.308C7.43226 196.098 9.35914 194.163 11.5613 194.163C13.9011 194.44 15.6903 196.098 15.828 198.446Z" fill="#EC1C24"/>
                        <path d="M0 160.175L0 168.88L33.3075 183.663V174.959L29.0409 173.024V155.892L33.3075 153.958V145.392L0 160.175ZM21.6086 159.208V169.847L9.77204 164.596L21.6086 159.208Z" fill="#EC1C24"/>
                        <path d="M33.3075 9.29957V0.595238L0 15.517L0 24.2213L33.3075 39.0049V30.3006L29.0409 28.3662V11.2339L33.3075 9.29957ZM21.6086 25.1885L9.77204 19.9382L21.6086 14.688V25.1885Z" fill="#EC1C24"/>
                        <path d="M16.2409 68.848L0 80.1775L0 88.8818H33.3075V80.3157H14.1763L30.2796 68.848L14.1763 57.5186H33.3075V48.8142H0L0 57.5186L16.2409 68.848Z" fill="#EC1C24"/>
                        <path d="M49.1356 7.36523C49.1356 8.60872 49.2733 9.99036 49.6862 10.9575H57.8066C59.0453 10.9575 59.7335 9.29953 59.7335 7.36523C59.7335 4.32562 58.6324 3.35847 54.5034 3.35847C49.9614 3.22032 49.1356 4.18745 49.1356 7.36523ZM61.2475 7.36523C61.2475 9.29953 60.6969 10.2667 60.1464 10.9575H65.7894V12.6155H48.5851C47.8969 11.2338 47.6216 8.88504 47.6216 7.36523C47.6216 3.35847 49.1356 1.42416 54.3657 1.42416C59.5958 1.42416 61.2475 3.22031 61.2475 7.36523ZM47.8969 17.8657V16.2077H60.284C60.9722 17.7275 61.2475 19.9382 61.2475 21.458C61.2475 25.1884 59.8711 26.5701 55.1915 26.5701H47.8969V24.9121H54.9163C58.9077 24.9121 59.7335 24.0831 59.7335 21.1817C59.7335 19.9382 59.5958 18.8329 59.3206 17.8657H47.8969ZM49.1356 35.9652C49.1356 32.9256 49.9614 31.8203 54.5034 31.8203C58.77 31.8203 59.8711 32.7874 59.8711 35.9652C59.8711 39.0048 58.77 39.972 54.5034 39.972C49.9614 39.972 49.1356 39.0048 49.1356 35.9652ZM61.2475 35.9652C61.2475 31.8203 59.5958 30.0242 54.3657 30.0242C48.998 30.0242 47.6216 31.9585 47.6216 35.9652C47.6216 39.972 49.1356 41.9063 54.3657 41.9063C59.5958 41.7681 61.2475 39.972 61.2475 35.9652ZM47.484 44.9459C47.484 46.8802 48.1722 48.1237 48.8604 48.6763H47.8969V50.3343H60.9722V48.6763H51.0625C49.8238 48.6763 49.4109 47.0184 49.4109 44.9459C49.4109 44.3932 49.4109 43.9787 49.5485 43.5643H47.8969C47.6216 44.1169 47.484 44.5314 47.484 44.9459ZM49.1356 59.315C49.1356 58.0715 49.2733 56.6899 49.6862 55.7227H57.8066C59.0453 55.7227 59.7335 57.3807 59.7335 59.315C59.7335 62.3546 58.6324 63.3217 54.5034 63.3217C49.9614 63.3217 49.1356 62.3546 49.1356 59.315ZM48.5851 54.0647C47.8969 55.4464 47.6216 57.7952 47.6216 59.315C47.6216 63.3217 49.1356 65.256 54.3657 65.256C59.7335 65.256 61.2475 63.3217 61.2475 59.315C61.2475 57.3807 60.6969 56.4135 60.1464 55.7227C63.5872 55.7227 64.5507 57.3807 64.5507 60.5585C64.5507 61.5256 64.2754 63.3217 63.8625 64.2889L65.5141 64.8416C65.927 63.8744 66.2023 61.8019 66.2023 60.6966C66.2023 56.6899 64.8259 54.2029 60.0087 54.2029L48.5851 54.0647ZM49.8238 76.8618L48.1722 76.3092C47.7593 77.829 47.484 79.3488 47.484 80.5923C47.484 84.0464 48.4475 85.7043 51.4754 85.7043C53.9528 85.7043 54.7786 84.0464 54.9163 80.8686C55.0539 78.3816 55.7421 77.6908 57.1184 77.6908C59.1829 77.6908 59.5958 78.7961 59.5958 80.8686C59.5958 82.2502 59.1829 84.1845 58.9077 85.0135L60.4216 85.5662C60.8346 84.1845 61.1098 82.1121 61.1098 80.8686C61.1098 77.4145 60.1464 75.7565 56.9808 75.7565C54.5034 75.7565 53.4023 77.2763 53.2647 80.5923C53.127 82.9411 52.5765 83.9082 51.2001 83.9082C49.1356 83.9082 48.8604 82.8029 48.8604 80.5923C49.1356 79.3488 49.4109 77.9672 49.8238 76.8618ZM49.1356 93.7179C49.1356 91.2309 49.8238 90.4019 53.127 90.2638V97.7246C49.9614 97.5865 49.1356 96.6193 49.1356 93.7179ZM47.484 93.7179C47.484 97.5865 49.1356 99.5208 54.2281 99.5208C59.5958 99.5208 61.1098 97.3102 61.1098 93.4416C61.1098 92.3362 60.8346 90.5401 60.4216 89.1584L58.9077 89.573C59.3206 90.6783 59.5958 92.3362 59.5958 93.3034C59.5958 96.343 58.6324 97.7246 54.5034 97.7246V88.3295C48.998 88.4676 47.484 90.1256 47.484 93.7179ZM42.9421 103.804C42.9421 104.633 43.0797 104.909 43.9055 104.909C44.869 104.909 45.0066 104.633 45.0066 103.804C45.0066 102.975 44.869 102.699 43.9055 102.699C43.0797 102.699 42.9421 102.975 42.9421 103.804ZM60.9722 102.975V104.633H47.8969V102.975H60.9722ZM49.1356 113.614C49.1356 112.37 49.2733 110.988 49.6862 110.021H57.8066C59.0453 110.021 59.7335 111.679 59.7335 113.614C59.7335 116.653 58.6324 117.62 54.5034 117.62C49.9614 117.62 49.1356 116.653 49.1356 113.614ZM48.5851 108.225C47.8969 109.607 47.6216 111.956 47.6216 113.475C47.6216 117.482 49.1356 119.416 54.3657 119.416C59.7335 119.416 61.2475 117.482 61.2475 113.475C61.2475 111.541 60.6969 110.574 60.1464 109.883C63.5872 109.883 64.5507 111.541 64.5507 114.719C64.5507 115.686 64.2754 117.482 63.8625 118.449L65.3765 119.002C65.7894 118.035 66.0647 115.962 66.0647 114.719C66.0647 110.712 64.6883 108.225 59.8711 108.225H48.5851ZM49.1356 128.397C49.1356 125.357 49.9614 124.252 54.5034 124.252C58.77 124.252 59.8711 125.219 59.8711 128.397C59.8711 131.437 58.77 132.404 54.5034 132.404C49.9614 132.404 49.1356 131.437 49.1356 128.397ZM61.2475 128.397C61.2475 124.252 59.5958 122.456 54.3657 122.456C48.998 122.456 47.6216 124.39 47.6216 128.397C47.484 132.404 48.998 134.338 54.3657 134.338C59.5958 134.338 61.2475 132.404 61.2475 128.397ZM42.2539 137.654V139.312H57.669C59.5958 139.312 60.4216 138.759 61.3851 137.654L60.284 136.272C59.3206 137.24 58.77 137.516 57.5313 137.516L42.2539 137.654ZM49.1356 148.569C49.1356 145.529 49.9614 144.424 54.5034 144.424C58.77 144.424 59.8711 145.391 59.8711 148.569C59.8711 151.609 58.77 152.576 54.5034 152.576C49.9614 152.714 49.1356 151.747 49.1356 148.569ZM61.2475 148.569C61.2475 144.424 59.5958 142.628 54.3657 142.628C48.998 142.628 47.6216 144.562 47.6216 148.569C47.6216 152.576 49.1356 154.51 54.3657 154.51C59.5958 154.51 61.2475 152.714 61.2475 148.569ZM49.5485 166.53C49.2733 165.563 49.1356 164.458 49.1356 163.214C49.1356 160.313 49.9614 159.484 53.9528 159.484H60.9722V157.826H53.6776C48.998 157.826 47.6216 159.208 47.6216 162.938C47.6216 164.458 48.0345 166.807 48.5851 168.188H60.9722V166.53H49.5485ZM47.484 176.755C47.484 178.413 48.0345 179.932 48.5851 180.485H42.2539V182.143H60.8345V180.485H50.9249C49.6862 180.485 49.1356 178.689 49.1356 176.893C49.1356 174.268 49.9614 173.439 53.9528 173.439H60.9722V171.781H53.6776C48.8604 171.919 47.484 173.3 47.484 176.755ZM59.0453 185.321C59.4582 186.288 59.7335 187.393 59.7335 188.499C59.7335 191.538 58.6324 192.92 54.5034 192.92C50.0991 192.92 49.2733 191.538 49.2733 188.499C49.2733 187.393 49.4109 186.288 49.8238 185.321L48.3098 184.768C47.8969 185.735 47.6216 187.393 47.6216 188.499C47.6216 192.505 49.1356 194.854 54.3657 194.854C59.7335 194.854 61.2475 192.643 61.2475 188.499C61.2475 187.393 60.9722 185.735 60.5593 184.768L59.0453 185.321ZM49.1356 203.006C49.1356 200.519 49.8238 199.69 53.127 199.552V207.013C49.9614 206.736 49.1356 205.769 49.1356 203.006ZM47.484 203.006C47.484 206.874 49.2733 208.947 54.3657 208.947C59.7335 208.947 61.2475 206.736 61.2475 202.868C61.2475 201.762 60.9722 199.966 60.5593 198.585L59.0453 198.999C59.4582 200.104 59.7335 201.762 59.7335 202.729C59.7335 205.769 58.77 207.151 54.641 207.151V197.756C48.998 197.617 47.484 199.275 47.484 203.006ZM56.5679 215.993C58.77 215.993 59.7335 215.441 59.7335 213.506C59.7335 212.539 59.5958 211.71 59.3206 211.019L60.8345 210.605C61.1098 211.434 61.2475 212.539 61.2475 213.506C61.2475 216.546 60.4216 217.651 56.5679 217.651H49.4109V220H47.8969V217.651H45.1442L44.4561 215.993H47.8969V211.157H49.4109V215.993H56.5679Z" fill="#898B8D"/>
                        </svg>
                </a>          
            </nav>
    
        `
    }
}

customElements.define('custom-sidebar', Sidebar);

class LectureSidebar extends HTMLElement {
    connectedCallback() {
        const style_num = this.getAttribute('style_num') || "2";
        this.innerHTML = `
            <link rel="stylesheet" type="text/css" href="components/sidebar_style${style_num}.css">
            <nav class="nav_open" id="sidebar">
            <button class="close_menu_btn" onclick="close_menu()">
                <svg viewBox="0 0 64 59" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23.5477 44.25C17.9387 40.4259 12.9009 35.9586 8.55872 30.961C8.18624 30.5323 8 30.0162 8 29.5M23.5477 14.75C17.9387 18.5741 12.9009 23.0414 8.55872 28.039C8.18624 28.4677 8 28.9838 8 29.5M8 29.5L56 29.5" stroke="#0F2232" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>                
            </button>
            <ul>
                <li><a class="edit" onclick="edit()" style="margin: 0.5rem 0 0 2rem">
                    <svg viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M3.7456 0C1.67696 0 0 1.70132 0 3.8V34.2C0 36.2987 1.67696 38 3.7456 38H33.7104C35.7791 38 37.456 36.2987 37.456 34.2V26.6C37.456 25.5507 36.6175 24.7 35.5832 24.7C34.5489 24.7 33.7104 25.5507 33.7104 26.6V34.2H3.7456V3.8H18.728C19.7623 3.8 20.6008 2.94934 20.6008 1.9C20.6008 0.850659 19.7623 0 18.728 0H3.7456ZM33.8369 1.6792C32.3817 0.427874 30.2321 0.485874 28.8446 1.81389L10.1628 19.6948C9.70534 20.1326 9.36394 20.6802 9.17003 21.2871L7.80015 25.5744C6.79666 28.715 9.94654 31.5705 12.9102 30.2069L17.3029 28.1859C17.6796 28.0125 18.0254 27.7771 18.3262 27.4892L36.8247 9.78377C38.4494 8.22881 38.3801 5.58612 36.6763 4.12096L33.8369 1.6792ZM31.4149 4.57795L34.2544 7.01971L15.7559 24.7251L11.3632 26.7462L12.7331 22.4588L31.4149 4.57795Z" fill="#0F2232"/>
                        </svg>  
                    Редактировать          
                </a></li>
            </ul>
            <a href="#" class="logo">
                <svg viewBox="0 0 67 220" fill="none" xmlns="http://www.w3.org/2000/svg">                        <path d="M11.698 102.422C5.36683 102.422 0.274353 107.534 0.136719 113.89L0.136719 135.443H3.43994H33.3066V126.601H23.2593V118.864L33.3066 110.988V101.593L22.5711 110.021C20.9195 105.6 16.6528 102.422 11.698 102.422ZM7.43134 126.601V114.995V114.304V113.89C7.43134 111.679 9.35822 109.745 11.5604 109.745C13.7625 109.745 15.6894 111.541 15.6894 113.752V113.89L15.827 114.995L15.827 126.739L7.43134 126.601Z" fill="#EC1C24"/>
                    <path d="M0 198.446L0 220H33.1699V211.157H23.1226V198.585C23.1226 192.229 17.8925 186.979 11.5613 186.979C5.36774 186.979 0.137634 192.091 0 198.446ZM15.828 198.446V199.552L15.828 211.157H7.43226V199.414V198.723V198.308C7.43226 196.098 9.35914 194.163 11.5613 194.163C13.9011 194.44 15.6903 196.098 15.828 198.446Z" fill="#EC1C24"/>
                    <path d="M0 160.175L0 168.88L33.3075 183.663V174.959L29.0409 173.024V155.892L33.3075 153.958V145.392L0 160.175ZM21.6086 159.208V169.847L9.77204 164.596L21.6086 159.208Z" fill="#EC1C24"/>
                    <path d="M33.3075 9.29957V0.595238L0 15.517L0 24.2213L33.3075 39.0049V30.3006L29.0409 28.3662V11.2339L33.3075 9.29957ZM21.6086 25.1885L9.77204 19.9382L21.6086 14.688V25.1885Z" fill="#EC1C24"/>
                    <path d="M16.2409 68.848L0 80.1775L0 88.8818H33.3075V80.3157H14.1763L30.2796 68.848L14.1763 57.5186H33.3075V48.8142H0L0 57.5186L16.2409 68.848Z" fill="#EC1C24"/>
                    <path d="M49.1356 7.36523C49.1356 8.60872 49.2733 9.99036 49.6862 10.9575H57.8066C59.0453 10.9575 59.7335 9.29953 59.7335 7.36523C59.7335 4.32562 58.6324 3.35847 54.5034 3.35847C49.9614 3.22032 49.1356 4.18745 49.1356 7.36523ZM61.2475 7.36523C61.2475 9.29953 60.6969 10.2667 60.1464 10.9575H65.7894V12.6155H48.5851C47.8969 11.2338 47.6216 8.88504 47.6216 7.36523C47.6216 3.35847 49.1356 1.42416 54.3657 1.42416C59.5958 1.42416 61.2475 3.22031 61.2475 7.36523ZM47.8969 17.8657V16.2077H60.284C60.9722 17.7275 61.2475 19.9382 61.2475 21.458C61.2475 25.1884 59.8711 26.5701 55.1915 26.5701H47.8969V24.9121H54.9163C58.9077 24.9121 59.7335 24.0831 59.7335 21.1817C59.7335 19.9382 59.5958 18.8329 59.3206 17.8657H47.8969ZM49.1356 35.9652C49.1356 32.9256 49.9614 31.8203 54.5034 31.8203C58.77 31.8203 59.8711 32.7874 59.8711 35.9652C59.8711 39.0048 58.77 39.972 54.5034 39.972C49.9614 39.972 49.1356 39.0048 49.1356 35.9652ZM61.2475 35.9652C61.2475 31.8203 59.5958 30.0242 54.3657 30.0242C48.998 30.0242 47.6216 31.9585 47.6216 35.9652C47.6216 39.972 49.1356 41.9063 54.3657 41.9063C59.5958 41.7681 61.2475 39.972 61.2475 35.9652ZM47.484 44.9459C47.484 46.8802 48.1722 48.1237 48.8604 48.6763H47.8969V50.3343H60.9722V48.6763H51.0625C49.8238 48.6763 49.4109 47.0184 49.4109 44.9459C49.4109 44.3932 49.4109 43.9787 49.5485 43.5643H47.8969C47.6216 44.1169 47.484 44.5314 47.484 44.9459ZM49.1356 59.315C49.1356 58.0715 49.2733 56.6899 49.6862 55.7227H57.8066C59.0453 55.7227 59.7335 57.3807 59.7335 59.315C59.7335 62.3546 58.6324 63.3217 54.5034 63.3217C49.9614 63.3217 49.1356 62.3546 49.1356 59.315ZM48.5851 54.0647C47.8969 55.4464 47.6216 57.7952 47.6216 59.315C47.6216 63.3217 49.1356 65.256 54.3657 65.256C59.7335 65.256 61.2475 63.3217 61.2475 59.315C61.2475 57.3807 60.6969 56.4135 60.1464 55.7227C63.5872 55.7227 64.5507 57.3807 64.5507 60.5585C64.5507 61.5256 64.2754 63.3217 63.8625 64.2889L65.5141 64.8416C65.927 63.8744 66.2023 61.8019 66.2023 60.6966C66.2023 56.6899 64.8259 54.2029 60.0087 54.2029L48.5851 54.0647ZM49.8238 76.8618L48.1722 76.3092C47.7593 77.829 47.484 79.3488 47.484 80.5923C47.484 84.0464 48.4475 85.7043 51.4754 85.7043C53.9528 85.7043 54.7786 84.0464 54.9163 80.8686C55.0539 78.3816 55.7421 77.6908 57.1184 77.6908C59.1829 77.6908 59.5958 78.7961 59.5958 80.8686C59.5958 82.2502 59.1829 84.1845 58.9077 85.0135L60.4216 85.5662C60.8346 84.1845 61.1098 82.1121 61.1098 80.8686C61.1098 77.4145 60.1464 75.7565 56.9808 75.7565C54.5034 75.7565 53.4023 77.2763 53.2647 80.5923C53.127 82.9411 52.5765 83.9082 51.2001 83.9082C49.1356 83.9082 48.8604 82.8029 48.8604 80.5923C49.1356 79.3488 49.4109 77.9672 49.8238 76.8618ZM49.1356 93.7179C49.1356 91.2309 49.8238 90.4019 53.127 90.2638V97.7246C49.9614 97.5865 49.1356 96.6193 49.1356 93.7179ZM47.484 93.7179C47.484 97.5865 49.1356 99.5208 54.2281 99.5208C59.5958 99.5208 61.1098 97.3102 61.1098 93.4416C61.1098 92.3362 60.8346 90.5401 60.4216 89.1584L58.9077 89.573C59.3206 90.6783 59.5958 92.3362 59.5958 93.3034C59.5958 96.343 58.6324 97.7246 54.5034 97.7246V88.3295C48.998 88.4676 47.484 90.1256 47.484 93.7179ZM42.9421 103.804C42.9421 104.633 43.0797 104.909 43.9055 104.909C44.869 104.909 45.0066 104.633 45.0066 103.804C45.0066 102.975 44.869 102.699 43.9055 102.699C43.0797 102.699 42.9421 102.975 42.9421 103.804ZM60.9722 102.975V104.633H47.8969V102.975H60.9722ZM49.1356 113.614C49.1356 112.37 49.2733 110.988 49.6862 110.021H57.8066C59.0453 110.021 59.7335 111.679 59.7335 113.614C59.7335 116.653 58.6324 117.62 54.5034 117.62C49.9614 117.62 49.1356 116.653 49.1356 113.614ZM48.5851 108.225C47.8969 109.607 47.6216 111.956 47.6216 113.475C47.6216 117.482 49.1356 119.416 54.3657 119.416C59.7335 119.416 61.2475 117.482 61.2475 113.475C61.2475 111.541 60.6969 110.574 60.1464 109.883C63.5872 109.883 64.5507 111.541 64.5507 114.719C64.5507 115.686 64.2754 117.482 63.8625 118.449L65.3765 119.002C65.7894 118.035 66.0647 115.962 66.0647 114.719C66.0647 110.712 64.6883 108.225 59.8711 108.225H48.5851ZM49.1356 128.397C49.1356 125.357 49.9614 124.252 54.5034 124.252C58.77 124.252 59.8711 125.219 59.8711 128.397C59.8711 131.437 58.77 132.404 54.5034 132.404C49.9614 132.404 49.1356 131.437 49.1356 128.397ZM61.2475 128.397C61.2475 124.252 59.5958 122.456 54.3657 122.456C48.998 122.456 47.6216 124.39 47.6216 128.397C47.484 132.404 48.998 134.338 54.3657 134.338C59.5958 134.338 61.2475 132.404 61.2475 128.397ZM42.2539 137.654V139.312H57.669C59.5958 139.312 60.4216 138.759 61.3851 137.654L60.284 136.272C59.3206 137.24 58.77 137.516 57.5313 137.516L42.2539 137.654ZM49.1356 148.569C49.1356 145.529 49.9614 144.424 54.5034 144.424C58.77 144.424 59.8711 145.391 59.8711 148.569C59.8711 151.609 58.77 152.576 54.5034 152.576C49.9614 152.714 49.1356 151.747 49.1356 148.569ZM61.2475 148.569C61.2475 144.424 59.5958 142.628 54.3657 142.628C48.998 142.628 47.6216 144.562 47.6216 148.569C47.6216 152.576 49.1356 154.51 54.3657 154.51C59.5958 154.51 61.2475 152.714 61.2475 148.569ZM49.5485 166.53C49.2733 165.563 49.1356 164.458 49.1356 163.214C49.1356 160.313 49.9614 159.484 53.9528 159.484H60.9722V157.826H53.6776C48.998 157.826 47.6216 159.208 47.6216 162.938C47.6216 164.458 48.0345 166.807 48.5851 168.188H60.9722V166.53H49.5485ZM47.484 176.755C47.484 178.413 48.0345 179.932 48.5851 180.485H42.2539V182.143H60.8345V180.485H50.9249C49.6862 180.485 49.1356 178.689 49.1356 176.893C49.1356 174.268 49.9614 173.439 53.9528 173.439H60.9722V171.781H53.6776C48.8604 171.919 47.484 173.3 47.484 176.755ZM59.0453 185.321C59.4582 186.288 59.7335 187.393 59.7335 188.499C59.7335 191.538 58.6324 192.92 54.5034 192.92C50.0991 192.92 49.2733 191.538 49.2733 188.499C49.2733 187.393 49.4109 186.288 49.8238 185.321L48.3098 184.768C47.8969 185.735 47.6216 187.393 47.6216 188.499C47.6216 192.505 49.1356 194.854 54.3657 194.854C59.7335 194.854 61.2475 192.643 61.2475 188.499C61.2475 187.393 60.9722 185.735 60.5593 184.768L59.0453 185.321ZM49.1356 203.006C49.1356 200.519 49.8238 199.69 53.127 199.552V207.013C49.9614 206.736 49.1356 205.769 49.1356 203.006ZM47.484 203.006C47.484 206.874 49.2733 208.947 54.3657 208.947C59.7335 208.947 61.2475 206.736 61.2475 202.868C61.2475 201.762 60.9722 199.966 60.5593 198.585L59.0453 198.999C59.4582 200.104 59.7335 201.762 59.7335 202.729C59.7335 205.769 58.77 207.151 54.641 207.151V197.756C48.998 197.617 47.484 199.275 47.484 203.006ZM56.5679 215.993C58.77 215.993 59.7335 215.441 59.7335 213.506C59.7335 212.539 59.5958 211.71 59.3206 211.019L60.8345 210.605C61.1098 211.434 61.2475 212.539 61.2475 213.506C61.2475 216.546 60.4216 217.651 56.5679 217.651H49.4109V220H47.8969V217.651H45.1442L44.4561 215.993H47.8969V211.157H49.4109V215.993H56.5679Z" fill="#898B8D"/>
                    </svg>
            </a>          
            </nav>
            <nav class="nav_close" id="no-sidebar">
                <button class="open_menu_btn" onclick="open_menu()">
                    <svg viewBox="0 0 51 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 18H48" stroke="#0F2232" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M3 3H48" stroke="#0F2232" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M3 33H48" stroke="#0F2232" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                </button>
                <a href="#" class="logo">
                    <svg viewBox="0 0 67 220" fill="none" xmlns="http://www.w3.org/2000/svg">                        <path d="M11.698 102.422C5.36683 102.422 0.274353 107.534 0.136719 113.89L0.136719 135.443H3.43994H33.3066V126.601H23.2593V118.864L33.3066 110.988V101.593L22.5711 110.021C20.9195 105.6 16.6528 102.422 11.698 102.422ZM7.43134 126.601V114.995V114.304V113.89C7.43134 111.679 9.35822 109.745 11.5604 109.745C13.7625 109.745 15.6894 111.541 15.6894 113.752V113.89L15.827 114.995L15.827 126.739L7.43134 126.601Z" fill="#EC1C24"/>
                        <path d="M0 198.446L0 220H33.1699V211.157H23.1226V198.585C23.1226 192.229 17.8925 186.979 11.5613 186.979C5.36774 186.979 0.137634 192.091 0 198.446ZM15.828 198.446V199.552L15.828 211.157H7.43226V199.414V198.723V198.308C7.43226 196.098 9.35914 194.163 11.5613 194.163C13.9011 194.44 15.6903 196.098 15.828 198.446Z" fill="#EC1C24"/>
                        <path d="M0 160.175L0 168.88L33.3075 183.663V174.959L29.0409 173.024V155.892L33.3075 153.958V145.392L0 160.175ZM21.6086 159.208V169.847L9.77204 164.596L21.6086 159.208Z" fill="#EC1C24"/>
                        <path d="M33.3075 9.29957V0.595238L0 15.517L0 24.2213L33.3075 39.0049V30.3006L29.0409 28.3662V11.2339L33.3075 9.29957ZM21.6086 25.1885L9.77204 19.9382L21.6086 14.688V25.1885Z" fill="#EC1C24"/>
                        <path d="M16.2409 68.848L0 80.1775L0 88.8818H33.3075V80.3157H14.1763L30.2796 68.848L14.1763 57.5186H33.3075V48.8142H0L0 57.5186L16.2409 68.848Z" fill="#EC1C24"/>
                        <path d="M49.1356 7.36523C49.1356 8.60872 49.2733 9.99036 49.6862 10.9575H57.8066C59.0453 10.9575 59.7335 9.29953 59.7335 7.36523C59.7335 4.32562 58.6324 3.35847 54.5034 3.35847C49.9614 3.22032 49.1356 4.18745 49.1356 7.36523ZM61.2475 7.36523C61.2475 9.29953 60.6969 10.2667 60.1464 10.9575H65.7894V12.6155H48.5851C47.8969 11.2338 47.6216 8.88504 47.6216 7.36523C47.6216 3.35847 49.1356 1.42416 54.3657 1.42416C59.5958 1.42416 61.2475 3.22031 61.2475 7.36523ZM47.8969 17.8657V16.2077H60.284C60.9722 17.7275 61.2475 19.9382 61.2475 21.458C61.2475 25.1884 59.8711 26.5701 55.1915 26.5701H47.8969V24.9121H54.9163C58.9077 24.9121 59.7335 24.0831 59.7335 21.1817C59.7335 19.9382 59.5958 18.8329 59.3206 17.8657H47.8969ZM49.1356 35.9652C49.1356 32.9256 49.9614 31.8203 54.5034 31.8203C58.77 31.8203 59.8711 32.7874 59.8711 35.9652C59.8711 39.0048 58.77 39.972 54.5034 39.972C49.9614 39.972 49.1356 39.0048 49.1356 35.9652ZM61.2475 35.9652C61.2475 31.8203 59.5958 30.0242 54.3657 30.0242C48.998 30.0242 47.6216 31.9585 47.6216 35.9652C47.6216 39.972 49.1356 41.9063 54.3657 41.9063C59.5958 41.7681 61.2475 39.972 61.2475 35.9652ZM47.484 44.9459C47.484 46.8802 48.1722 48.1237 48.8604 48.6763H47.8969V50.3343H60.9722V48.6763H51.0625C49.8238 48.6763 49.4109 47.0184 49.4109 44.9459C49.4109 44.3932 49.4109 43.9787 49.5485 43.5643H47.8969C47.6216 44.1169 47.484 44.5314 47.484 44.9459ZM49.1356 59.315C49.1356 58.0715 49.2733 56.6899 49.6862 55.7227H57.8066C59.0453 55.7227 59.7335 57.3807 59.7335 59.315C59.7335 62.3546 58.6324 63.3217 54.5034 63.3217C49.9614 63.3217 49.1356 62.3546 49.1356 59.315ZM48.5851 54.0647C47.8969 55.4464 47.6216 57.7952 47.6216 59.315C47.6216 63.3217 49.1356 65.256 54.3657 65.256C59.7335 65.256 61.2475 63.3217 61.2475 59.315C61.2475 57.3807 60.6969 56.4135 60.1464 55.7227C63.5872 55.7227 64.5507 57.3807 64.5507 60.5585C64.5507 61.5256 64.2754 63.3217 63.8625 64.2889L65.5141 64.8416C65.927 63.8744 66.2023 61.8019 66.2023 60.6966C66.2023 56.6899 64.8259 54.2029 60.0087 54.2029L48.5851 54.0647ZM49.8238 76.8618L48.1722 76.3092C47.7593 77.829 47.484 79.3488 47.484 80.5923C47.484 84.0464 48.4475 85.7043 51.4754 85.7043C53.9528 85.7043 54.7786 84.0464 54.9163 80.8686C55.0539 78.3816 55.7421 77.6908 57.1184 77.6908C59.1829 77.6908 59.5958 78.7961 59.5958 80.8686C59.5958 82.2502 59.1829 84.1845 58.9077 85.0135L60.4216 85.5662C60.8346 84.1845 61.1098 82.1121 61.1098 80.8686C61.1098 77.4145 60.1464 75.7565 56.9808 75.7565C54.5034 75.7565 53.4023 77.2763 53.2647 80.5923C53.127 82.9411 52.5765 83.9082 51.2001 83.9082C49.1356 83.9082 48.8604 82.8029 48.8604 80.5923C49.1356 79.3488 49.4109 77.9672 49.8238 76.8618ZM49.1356 93.7179C49.1356 91.2309 49.8238 90.4019 53.127 90.2638V97.7246C49.9614 97.5865 49.1356 96.6193 49.1356 93.7179ZM47.484 93.7179C47.484 97.5865 49.1356 99.5208 54.2281 99.5208C59.5958 99.5208 61.1098 97.3102 61.1098 93.4416C61.1098 92.3362 60.8346 90.5401 60.4216 89.1584L58.9077 89.573C59.3206 90.6783 59.5958 92.3362 59.5958 93.3034C59.5958 96.343 58.6324 97.7246 54.5034 97.7246V88.3295C48.998 88.4676 47.484 90.1256 47.484 93.7179ZM42.9421 103.804C42.9421 104.633 43.0797 104.909 43.9055 104.909C44.869 104.909 45.0066 104.633 45.0066 103.804C45.0066 102.975 44.869 102.699 43.9055 102.699C43.0797 102.699 42.9421 102.975 42.9421 103.804ZM60.9722 102.975V104.633H47.8969V102.975H60.9722ZM49.1356 113.614C49.1356 112.37 49.2733 110.988 49.6862 110.021H57.8066C59.0453 110.021 59.7335 111.679 59.7335 113.614C59.7335 116.653 58.6324 117.62 54.5034 117.62C49.9614 117.62 49.1356 116.653 49.1356 113.614ZM48.5851 108.225C47.8969 109.607 47.6216 111.956 47.6216 113.475C47.6216 117.482 49.1356 119.416 54.3657 119.416C59.7335 119.416 61.2475 117.482 61.2475 113.475C61.2475 111.541 60.6969 110.574 60.1464 109.883C63.5872 109.883 64.5507 111.541 64.5507 114.719C64.5507 115.686 64.2754 117.482 63.8625 118.449L65.3765 119.002C65.7894 118.035 66.0647 115.962 66.0647 114.719C66.0647 110.712 64.6883 108.225 59.8711 108.225H48.5851ZM49.1356 128.397C49.1356 125.357 49.9614 124.252 54.5034 124.252C58.77 124.252 59.8711 125.219 59.8711 128.397C59.8711 131.437 58.77 132.404 54.5034 132.404C49.9614 132.404 49.1356 131.437 49.1356 128.397ZM61.2475 128.397C61.2475 124.252 59.5958 122.456 54.3657 122.456C48.998 122.456 47.6216 124.39 47.6216 128.397C47.484 132.404 48.998 134.338 54.3657 134.338C59.5958 134.338 61.2475 132.404 61.2475 128.397ZM42.2539 137.654V139.312H57.669C59.5958 139.312 60.4216 138.759 61.3851 137.654L60.284 136.272C59.3206 137.24 58.77 137.516 57.5313 137.516L42.2539 137.654ZM49.1356 148.569C49.1356 145.529 49.9614 144.424 54.5034 144.424C58.77 144.424 59.8711 145.391 59.8711 148.569C59.8711 151.609 58.77 152.576 54.5034 152.576C49.9614 152.714 49.1356 151.747 49.1356 148.569ZM61.2475 148.569C61.2475 144.424 59.5958 142.628 54.3657 142.628C48.998 142.628 47.6216 144.562 47.6216 148.569C47.6216 152.576 49.1356 154.51 54.3657 154.51C59.5958 154.51 61.2475 152.714 61.2475 148.569ZM49.5485 166.53C49.2733 165.563 49.1356 164.458 49.1356 163.214C49.1356 160.313 49.9614 159.484 53.9528 159.484H60.9722V157.826H53.6776C48.998 157.826 47.6216 159.208 47.6216 162.938C47.6216 164.458 48.0345 166.807 48.5851 168.188H60.9722V166.53H49.5485ZM47.484 176.755C47.484 178.413 48.0345 179.932 48.5851 180.485H42.2539V182.143H60.8345V180.485H50.9249C49.6862 180.485 49.1356 178.689 49.1356 176.893C49.1356 174.268 49.9614 173.439 53.9528 173.439H60.9722V171.781H53.6776C48.8604 171.919 47.484 173.3 47.484 176.755ZM59.0453 185.321C59.4582 186.288 59.7335 187.393 59.7335 188.499C59.7335 191.538 58.6324 192.92 54.5034 192.92C50.0991 192.92 49.2733 191.538 49.2733 188.499C49.2733 187.393 49.4109 186.288 49.8238 185.321L48.3098 184.768C47.8969 185.735 47.6216 187.393 47.6216 188.499C47.6216 192.505 49.1356 194.854 54.3657 194.854C59.7335 194.854 61.2475 192.643 61.2475 188.499C61.2475 187.393 60.9722 185.735 60.5593 184.768L59.0453 185.321ZM49.1356 203.006C49.1356 200.519 49.8238 199.69 53.127 199.552V207.013C49.9614 206.736 49.1356 205.769 49.1356 203.006ZM47.484 203.006C47.484 206.874 49.2733 208.947 54.3657 208.947C59.7335 208.947 61.2475 206.736 61.2475 202.868C61.2475 201.762 60.9722 199.966 60.5593 198.585L59.0453 198.999C59.4582 200.104 59.7335 201.762 59.7335 202.729C59.7335 205.769 58.77 207.151 54.641 207.151V197.756C48.998 197.617 47.484 199.275 47.484 203.006ZM56.5679 215.993C58.77 215.993 59.7335 215.441 59.7335 213.506C59.7335 212.539 59.5958 211.71 59.3206 211.019L60.8345 210.605C61.1098 211.434 61.2475 212.539 61.2475 213.506C61.2475 216.546 60.4216 217.651 56.5679 217.651H49.4109V220H47.8969V217.651H45.1442L44.4561 215.993H47.8969V211.157H49.4109V215.993H56.5679Z" fill="#898B8D"/>
                        </svg>
                </a>          
            </nav>
    
        `
    }
}

customElements.define('custom-lecture_sidebar', LectureSidebar);

class Sidepanel extends HTMLElement {
    connectedCallback() {
        const back_page = this.getAttribute('back_page');
        const style_num = this.getAttribute('style_num') || "2";
        this.innerHTML = `
            <link rel="stylesheet" type="text/css" href="components/sidepanel_style${style_num}.css">
            <nav class="nav_panel">
            <button class="back_btn" onclick="back()">
                <svg viewBox="0 0 64 59" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23.5477 44.25C17.9387 40.4259 12.9009 35.9586 8.55872 30.961C8.18624 30.5323 8 30.0162 8 29.5M23.5477 14.75C17.9387 18.5741 12.9009 23.0414 8.55872 28.039C8.18624 28.4677 8 28.9838 8 29.5M8 29.5L56 29.5" stroke="#0F2232" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>                
            </button>
            <a href="#" class="logo">
                <svg viewBox="0 0 67 220" fill="none" xmlns="http://www.w3.org/2000/svg">                        <path d="M11.698 102.422C5.36683 102.422 0.274353 107.534 0.136719 113.89L0.136719 135.443H3.43994H33.3066V126.601H23.2593V118.864L33.3066 110.988V101.593L22.5711 110.021C20.9195 105.6 16.6528 102.422 11.698 102.422ZM7.43134 126.601V114.995V114.304V113.89C7.43134 111.679 9.35822 109.745 11.5604 109.745C13.7625 109.745 15.6894 111.541 15.6894 113.752V113.89L15.827 114.995L15.827 126.739L7.43134 126.601Z" fill="#EC1C24"/>
                    <path d="M0 198.446L0 220H33.1699V211.157H23.1226V198.585C23.1226 192.229 17.8925 186.979 11.5613 186.979C5.36774 186.979 0.137634 192.091 0 198.446ZM15.828 198.446V199.552L15.828 211.157H7.43226V199.414V198.723V198.308C7.43226 196.098 9.35914 194.163 11.5613 194.163C13.9011 194.44 15.6903 196.098 15.828 198.446Z" fill="#EC1C24"/>
                    <path d="M0 160.175L0 168.88L33.3075 183.663V174.959L29.0409 173.024V155.892L33.3075 153.958V145.392L0 160.175ZM21.6086 159.208V169.847L9.77204 164.596L21.6086 159.208Z" fill="#EC1C24"/>
                    <path d="M33.3075 9.29957V0.595238L0 15.517L0 24.2213L33.3075 39.0049V30.3006L29.0409 28.3662V11.2339L33.3075 9.29957ZM21.6086 25.1885L9.77204 19.9382L21.6086 14.688V25.1885Z" fill="#EC1C24"/>
                    <path d="M16.2409 68.848L0 80.1775L0 88.8818H33.3075V80.3157H14.1763L30.2796 68.848L14.1763 57.5186H33.3075V48.8142H0L0 57.5186L16.2409 68.848Z" fill="#EC1C24"/>
                    <path d="M49.1356 7.36523C49.1356 8.60872 49.2733 9.99036 49.6862 10.9575H57.8066C59.0453 10.9575 59.7335 9.29953 59.7335 7.36523C59.7335 4.32562 58.6324 3.35847 54.5034 3.35847C49.9614 3.22032 49.1356 4.18745 49.1356 7.36523ZM61.2475 7.36523C61.2475 9.29953 60.6969 10.2667 60.1464 10.9575H65.7894V12.6155H48.5851C47.8969 11.2338 47.6216 8.88504 47.6216 7.36523C47.6216 3.35847 49.1356 1.42416 54.3657 1.42416C59.5958 1.42416 61.2475 3.22031 61.2475 7.36523ZM47.8969 17.8657V16.2077H60.284C60.9722 17.7275 61.2475 19.9382 61.2475 21.458C61.2475 25.1884 59.8711 26.5701 55.1915 26.5701H47.8969V24.9121H54.9163C58.9077 24.9121 59.7335 24.0831 59.7335 21.1817C59.7335 19.9382 59.5958 18.8329 59.3206 17.8657H47.8969ZM49.1356 35.9652C49.1356 32.9256 49.9614 31.8203 54.5034 31.8203C58.77 31.8203 59.8711 32.7874 59.8711 35.9652C59.8711 39.0048 58.77 39.972 54.5034 39.972C49.9614 39.972 49.1356 39.0048 49.1356 35.9652ZM61.2475 35.9652C61.2475 31.8203 59.5958 30.0242 54.3657 30.0242C48.998 30.0242 47.6216 31.9585 47.6216 35.9652C47.6216 39.972 49.1356 41.9063 54.3657 41.9063C59.5958 41.7681 61.2475 39.972 61.2475 35.9652ZM47.484 44.9459C47.484 46.8802 48.1722 48.1237 48.8604 48.6763H47.8969V50.3343H60.9722V48.6763H51.0625C49.8238 48.6763 49.4109 47.0184 49.4109 44.9459C49.4109 44.3932 49.4109 43.9787 49.5485 43.5643H47.8969C47.6216 44.1169 47.484 44.5314 47.484 44.9459ZM49.1356 59.315C49.1356 58.0715 49.2733 56.6899 49.6862 55.7227H57.8066C59.0453 55.7227 59.7335 57.3807 59.7335 59.315C59.7335 62.3546 58.6324 63.3217 54.5034 63.3217C49.9614 63.3217 49.1356 62.3546 49.1356 59.315ZM48.5851 54.0647C47.8969 55.4464 47.6216 57.7952 47.6216 59.315C47.6216 63.3217 49.1356 65.256 54.3657 65.256C59.7335 65.256 61.2475 63.3217 61.2475 59.315C61.2475 57.3807 60.6969 56.4135 60.1464 55.7227C63.5872 55.7227 64.5507 57.3807 64.5507 60.5585C64.5507 61.5256 64.2754 63.3217 63.8625 64.2889L65.5141 64.8416C65.927 63.8744 66.2023 61.8019 66.2023 60.6966C66.2023 56.6899 64.8259 54.2029 60.0087 54.2029L48.5851 54.0647ZM49.8238 76.8618L48.1722 76.3092C47.7593 77.829 47.484 79.3488 47.484 80.5923C47.484 84.0464 48.4475 85.7043 51.4754 85.7043C53.9528 85.7043 54.7786 84.0464 54.9163 80.8686C55.0539 78.3816 55.7421 77.6908 57.1184 77.6908C59.1829 77.6908 59.5958 78.7961 59.5958 80.8686C59.5958 82.2502 59.1829 84.1845 58.9077 85.0135L60.4216 85.5662C60.8346 84.1845 61.1098 82.1121 61.1098 80.8686C61.1098 77.4145 60.1464 75.7565 56.9808 75.7565C54.5034 75.7565 53.4023 77.2763 53.2647 80.5923C53.127 82.9411 52.5765 83.9082 51.2001 83.9082C49.1356 83.9082 48.8604 82.8029 48.8604 80.5923C49.1356 79.3488 49.4109 77.9672 49.8238 76.8618ZM49.1356 93.7179C49.1356 91.2309 49.8238 90.4019 53.127 90.2638V97.7246C49.9614 97.5865 49.1356 96.6193 49.1356 93.7179ZM47.484 93.7179C47.484 97.5865 49.1356 99.5208 54.2281 99.5208C59.5958 99.5208 61.1098 97.3102 61.1098 93.4416C61.1098 92.3362 60.8346 90.5401 60.4216 89.1584L58.9077 89.573C59.3206 90.6783 59.5958 92.3362 59.5958 93.3034C59.5958 96.343 58.6324 97.7246 54.5034 97.7246V88.3295C48.998 88.4676 47.484 90.1256 47.484 93.7179ZM42.9421 103.804C42.9421 104.633 43.0797 104.909 43.9055 104.909C44.869 104.909 45.0066 104.633 45.0066 103.804C45.0066 102.975 44.869 102.699 43.9055 102.699C43.0797 102.699 42.9421 102.975 42.9421 103.804ZM60.9722 102.975V104.633H47.8969V102.975H60.9722ZM49.1356 113.614C49.1356 112.37 49.2733 110.988 49.6862 110.021H57.8066C59.0453 110.021 59.7335 111.679 59.7335 113.614C59.7335 116.653 58.6324 117.62 54.5034 117.62C49.9614 117.62 49.1356 116.653 49.1356 113.614ZM48.5851 108.225C47.8969 109.607 47.6216 111.956 47.6216 113.475C47.6216 117.482 49.1356 119.416 54.3657 119.416C59.7335 119.416 61.2475 117.482 61.2475 113.475C61.2475 111.541 60.6969 110.574 60.1464 109.883C63.5872 109.883 64.5507 111.541 64.5507 114.719C64.5507 115.686 64.2754 117.482 63.8625 118.449L65.3765 119.002C65.7894 118.035 66.0647 115.962 66.0647 114.719C66.0647 110.712 64.6883 108.225 59.8711 108.225H48.5851ZM49.1356 128.397C49.1356 125.357 49.9614 124.252 54.5034 124.252C58.77 124.252 59.8711 125.219 59.8711 128.397C59.8711 131.437 58.77 132.404 54.5034 132.404C49.9614 132.404 49.1356 131.437 49.1356 128.397ZM61.2475 128.397C61.2475 124.252 59.5958 122.456 54.3657 122.456C48.998 122.456 47.6216 124.39 47.6216 128.397C47.484 132.404 48.998 134.338 54.3657 134.338C59.5958 134.338 61.2475 132.404 61.2475 128.397ZM42.2539 137.654V139.312H57.669C59.5958 139.312 60.4216 138.759 61.3851 137.654L60.284 136.272C59.3206 137.24 58.77 137.516 57.5313 137.516L42.2539 137.654ZM49.1356 148.569C49.1356 145.529 49.9614 144.424 54.5034 144.424C58.77 144.424 59.8711 145.391 59.8711 148.569C59.8711 151.609 58.77 152.576 54.5034 152.576C49.9614 152.714 49.1356 151.747 49.1356 148.569ZM61.2475 148.569C61.2475 144.424 59.5958 142.628 54.3657 142.628C48.998 142.628 47.6216 144.562 47.6216 148.569C47.6216 152.576 49.1356 154.51 54.3657 154.51C59.5958 154.51 61.2475 152.714 61.2475 148.569ZM49.5485 166.53C49.2733 165.563 49.1356 164.458 49.1356 163.214C49.1356 160.313 49.9614 159.484 53.9528 159.484H60.9722V157.826H53.6776C48.998 157.826 47.6216 159.208 47.6216 162.938C47.6216 164.458 48.0345 166.807 48.5851 168.188H60.9722V166.53H49.5485ZM47.484 176.755C47.484 178.413 48.0345 179.932 48.5851 180.485H42.2539V182.143H60.8345V180.485H50.9249C49.6862 180.485 49.1356 178.689 49.1356 176.893C49.1356 174.268 49.9614 173.439 53.9528 173.439H60.9722V171.781H53.6776C48.8604 171.919 47.484 173.3 47.484 176.755ZM59.0453 185.321C59.4582 186.288 59.7335 187.393 59.7335 188.499C59.7335 191.538 58.6324 192.92 54.5034 192.92C50.0991 192.92 49.2733 191.538 49.2733 188.499C49.2733 187.393 49.4109 186.288 49.8238 185.321L48.3098 184.768C47.8969 185.735 47.6216 187.393 47.6216 188.499C47.6216 192.505 49.1356 194.854 54.3657 194.854C59.7335 194.854 61.2475 192.643 61.2475 188.499C61.2475 187.393 60.9722 185.735 60.5593 184.768L59.0453 185.321ZM49.1356 203.006C49.1356 200.519 49.8238 199.69 53.127 199.552V207.013C49.9614 206.736 49.1356 205.769 49.1356 203.006ZM47.484 203.006C47.484 206.874 49.2733 208.947 54.3657 208.947C59.7335 208.947 61.2475 206.736 61.2475 202.868C61.2475 201.762 60.9722 199.966 60.5593 198.585L59.0453 198.999C59.4582 200.104 59.7335 201.762 59.7335 202.729C59.7335 205.769 58.77 207.151 54.641 207.151V197.756C48.998 197.617 47.484 199.275 47.484 203.006ZM56.5679 215.993C58.77 215.993 59.7335 215.441 59.7335 213.506C59.7335 212.539 59.5958 211.71 59.3206 211.019L60.8345 210.605C61.1098 211.434 61.2475 212.539 61.2475 213.506C61.2475 216.546 60.4216 217.651 56.5679 217.651H49.4109V220H47.8969V217.651H45.1442L44.4561 215.993H47.8969V211.157H49.4109V215.993H56.5679Z" fill="#898B8D"/>
                    </svg>
                </a>          
            </nav>
        `;
    }
}

// Регистрируем веб-компонент
customElements.define('custom-sidepanel', Sidepanel);






class Answer_input extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <link rel="stylesheet" type="text/css" href="components/answer-input.css">

        <div class="answer-input" id="input_ans">
            <textarea class="answer-input__text" id="text_box" placeholder="Введите ответ"></textarea>

            <label class="answer-input__field">
                <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M27 14.82V31C27 34.1826 25.7357 37.2348 23.4853 39.4853C21.2348 41.7357 18.1826 43 15 43C11.8174 43 8.76515 41.7357 6.51472 39.4853C4.26428 37.2348 3 34.1826 3 31V11C3 8.87827 3.84285 6.84344 5.34315 5.34315C6.84344 3.84285 8.87827 3 11 3C13.1217 3 15.1566 3.84285 16.6569 5.34315C18.1571 6.84344 19 8.87827 19 11V29.364C19 29.8893 18.8965 30.4094 18.6955 30.8947C18.4945 31.38 18.1999 31.821 17.8284 32.1924C17.457 32.5639 17.016 32.8585 16.5307 33.0595C16.0454 33.2605 15.5253 33.364 15 33.364C13.9391 33.364 12.9217 32.9426 12.1716 32.1924C11.4214 31.4423 11 30.4249 11 29.364V15" stroke="#0F2232" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>

                <input type="file" id="add_file" multiple>
            </label>

            <!-- Место,куда вставляются все файлы  -->
            <div class="filePlayer" id="filePlayer"></div>        
        `
    }
}
customElements.define('answer-input', Answer_input);


class Сomment_user extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `    
        <link rel="stylesheet" type="text/css" href="components/comment-user.css">

        <div class="comment-user">
            <img src="svg/A.svg" class="comment-user__img">
            <textarea class="comment-user__text" ></textarea>
        </div> 
        `
    }
}
customElements.define('comment-user', Сomment_user);


class Comment_admin extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `   
        <link rel="stylesheet" type="text/css" href="components/comment-admin.css">

        <div class="comment-admin">
            <img src="../svg/A.svg" class="comment-admin__img">
            <textarea class="comment-admin__text"  placeholder="Напишите комментарий к этому ответу" oninput="auto_grow(this)"></textarea>
        </div>       
        `
    }
}
customElements.define('comment-admin', Comment_admin);




class Video_input extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `    

        <!-- Место,куда вставляются все видеофайлы  -->
        <div class="videoPlayer" id="videoPlayer"></div>

        <!-- Окошко для выбора видео которое вставить  -->
        <div class="video-input" >
            <p class="video-input__label">Вставить видеофайл</p>
            <div class="video-input__video-file" onclick="changeToFile()"></div>
            <div class="video-input__youtube" onclick="changeToYoutube()"></div>
            <label class="video-input__field">
                <input type="file" id="add_video" accept="video/*">
            </label>
        </div>

        `
    }
}
customElements.define('video-input', Video_input);

class Text_input extends HTMLElement {
    connectedCallback() {
        const text = this.textContent.trim();
        const height = this.getAttribute('height');
        this.innerHTML = ` 

        <!-- Окошко для написания конспекта  -->
        <div class="text-input" style="height: ${height}rem;">
            <label class="text-input__area">
                <textarea class="text-input__textarea"  id="description" placeholder=""></textarea>
                <p class="text-input__label">${text}</p>
            </label>
        </div>    
        `
    }
}
customElements.define('text-input', Text_input);

class CustomProgressbar extends HTMLElement {
    connectedCallback(){
        this.innerHTML = `
            <link rel="stylesheet" type="text/css" href="components/progress_bar_style.css">
            
            <div class="skill">
                <div class="outer">
                    <div class="inner">
                        <div id="number">0%
                        </div>
                    </div>
                </div>

                <svg id="percentages" xmlns="http://www.w3.org/2000/svg" version="1.1">
                    <defs>
                    <linearGradient id="GradientColor">
                        <stop class="circle_progress" offset="100%" stop-color="#EC1C24" />
                    </linearGradient>
                    </defs>
                    <circle class="circle" cx="-9.5rem" cy="9.5rem" r="8.5rem" stroke-linecap="round" transform="rotate(-90 0 0)"/>
                </svg>
            </div>
        `
    }
}

customElements.define('custom-progressbar', CustomProgressbar);

class CustomProgressbar_small extends HTMLElement {
    connectedCallback(){
        // const progress = this.textContent.trim();
        const progress = this.getAttribute('progress');
        this.innerHTML = `
            
            <div class="skill">
                <div class="outer">
                    <div class="inner">
                        <div id="number">${progress}
                        </div>
                    </div>
                </div>

                <svg id="percentages" xmlns="http://www.w3.org/2000/svg" version="1.1">
                    <defs>
                    <linearGradient id="GradientColor">
                        <stop class="circle_progress" offset="100%" stop-color="#EC1C24" />
                    </linearGradient>
                    </defs>
                    <circle class="circle" cx="-8.5rem" cy="8.5rem" r="7.5rem" stroke-linecap="round" transform="rotate(-90 0 0)"/>
                </svg>
            </div>
        `
    }
}

customElements.define('custom-progressbar-small', CustomProgressbar_small);