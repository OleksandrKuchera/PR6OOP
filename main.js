const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let studentIdCounter = 1; 

class Student {
    constructor(name, subjects = {}) {
        this.id = studentIdCounter++;
        this.name = name;
        this.subjects = subjects;
    }


    changeName(newName) {
        this.name = newName;
    }


    addSubject(subject) {
        if (!this.subjects[subject]) {
            this.subjects[subject] = null;
        }
    }


    setGrade(subject, grade) {
        if (this.subjects.hasOwnProperty(subject)) {
            if (!Array.isArray(this.subjects[subject])) {
                this.subjects[subject] = []; // Створюємо масив, якщо його ще немає
            }
            this.subjects[subject].push(grade); // Зберігати всі оцінки у вигляді масиву
            console.log(`Студенту ${this.name} поставлено оцінку ${grade} з предмету ${subject}.`);
        } else {
            console.log(`Студент не має предмету ${subject}.`);
        }
    }


    getGrade(subject) {
        const grade = this.subjects[subject];
        if (grade !== undefined && grade !== null) {
            console.log(`Оцінка студента ${this.name} з предмету ${subject}: ${grade}`);
        } else {
            console.log(`Студент не має оцінки з предмету ${subject}.`);
        }
    }


    getGrades(subject) {
        const grades = this.subjects[subject];
        if (grades && grades.length > 0) {
            console.log(`Оцінки студента ${this.name} з предмету ${subject}: ${grades.join(', ')}`);
        } else {
            console.log(`Студент не має оцінок з предмету ${subject}.`);
        }
    }
}

class Group {
    constructor(name) {
        this.name = name;
        this.students = [];
        this.subjects = [];
    }

    addStudent(student) {
        this.students.push(student);
    }

    removeStudent(studentName) {
        const index = this.students.findIndex(student => student.name === studentName);
        if (index !== -1) {
            this.students.splice(index, 1);
            studentIdCounter -= 1
            console.log(`Студент ${studentName} видалений з групи ${this.name}.`);
        } else {
            console.log(`Студента ${studentName} не знайдено в групі ${this.name}.`);
        }
    }

    addSubject(subject) {
        if (this.subjects.includes(subject)) {
            console.log(`Предмет ${subject} вже є у групі ${this.name}.`);
        } else {
            // Перевірка, чи предмет вже є у інших групах
            const subjectExistsInAnyGroup = university.groups.some(group => group.subjects.includes(subject));
            if (subjectExistsInAnyGroup) {
                console.log(`Предмет ${subject} вже є у іншій групі.`);
            } else {
                this.subjects.push(subject);
                console.log(`Предмет ${subject} доданий до групи ${this.name}.`);
            }
        }
    }

    removeSubject(subject) {
        const index = this.subjects.indexOf(subject);
        if (index !== -1) {
            this.subjects.splice(index, 1);
            console.log(`Предмет ${subject} видалений з групи ${this.name}.`);
        } else {
            console.log(`Предмет ${subject} не знайдений у групі ${this.name}.`);
        }
    }

    getStudentCount() {
        return this.students.length;
    }

    viewSubjects() {
        console.log(`Предмети у групі ${this.name}: ${this.subjects.join(', ')}`);
    }
}

class University {
    constructor() {
        this.groups = [];
    }

    addGroup(group) {
        this.groups.push(group);
    }

    removeGroup(groupName) {
        const index = this.groups.findIndex(group => group.name === groupName);
        if (index !== -1) {
            this.groups.splice(index, 1);
            console.log(`Групу ${groupName} видалено.`);
        } else {
            console.log(`Група ${groupName} не знайдена.`);
        }
    }

    getTotalStudentCount() {
        let total = 0;
        this.groups.forEach(group => {
            total += group.getStudentCount();
        });
        return total;
    }

    
}

const university = new University();

function addStudentToGroup(groupName, student) {
    const group = university.groups.find(group => group.name === groupName);
    if (group) {
        const existingStudent = group.students.find(existingStudent => existingStudent.id === student.id);
        if (existingStudent) {
            console.log(`Студент з ID ${student.id} вже є в групі ${groupName}.`);
        } else {
            group.addStudent(student);
            console.log(`Студент ${student.name} доданий до групи ${groupName}.`);

            // Додати всі предмети до студента
            group.subjects.forEach(subject => {
                student.addSubject(subject);
            });
        }
    } else {
        console.log(`Групи ${groupName} не існує.`);
    }
    showCommands();
    handleCommandLineInput();
}

function addSubjectToGroup(groupName, subject) {
    const group = university.groups.find(group => group.name === groupName);
    if (group) {
        if (group.subjects.includes(subject)) {
            console.log(`Предмет ${subject} уже є у групі ${groupName}.`);
        } else {
            const subjectExistsInAnyGroup = university.groups.some(group => group.subjects.includes(subject));
            if (subjectExistsInAnyGroup) {
                console.log(`Предмет ${subject} вже є у іншій групі.`);
            } else {
                group.addSubject(subject);
                console.log(`Предмет ${subject} доданий до групи ${groupName}.`);
            }
        }
    } else {
        console.log(`Групи ${groupName} не існує.`);
    }
    showCommands();
    handleCommandLineInput();
}

function setGradeToStudent(groupName, studentName, subject, grade) {
    const group = university.groups.find(group => group.name === groupName);
    if (group) {
        const student = group.students.find(student => student.name === studentName);
        if (student) {
            // Перевірка, чи предмет є у списку предметів студента
            if (student.subjects.hasOwnProperty(subject)) {
                student.setGrade(subject, grade);
            } else {
                console.log(`Студент не має предмету ${subject}.`);
            }
        } else {
            console.log(`Студента ${studentName} не знайдено в групі ${groupName}.`);
        }
    } else {
        console.log(`Групи ${groupName} не існує.`);
    }
    showCommands();
    handleCommandLineInput();
}

function viewAllStudents() {
    console.log("Список усіх студентів:");
    university.groups.forEach(group => {
        group.students.forEach(student => {
            console.log(`Група ${group.name}: ID - ${student.id}, Ім'я - ${student.name}`);
        });
    });
}

function viewAllGroups() {
    console.log("Список усіх груп:");
    university.groups.forEach(group => {
        console.log(`Група ${group.name}: Кількість студентів - ${group.getStudentCount()}`);
    });
}

function showCommands() {
    console.log(' ')
    console.log(' ')
    console.log(' ')
    console.log('Доступні команди:');
    console.log('add_student - Додати студента до групи');
    console.log('remove_student - Видалити студента з групи');
    console.log('add_group - Додати нову групу');
    console.log('remove_group - Видалити групу');
    console.log('change_name - Змінити ім\'я студента');
    console.log('add_subject - Додати предмет до групи');
    console.log('remove_subject - Видалити предмет з групи');
    console.log('set_grade - Встановити оцінку студенту');
    console.log('get_grade - Отримати оцінку студента з предмету');
    console.log('view_subjects - Переглянути предмети у групі');
    console.log('group_student_count - Отримати кількість студентів у групі');
    console.log('total_student_count - Отримати загальну кількість студентів у ВНЗ');
    console.log('view_students - Переглянути усіх студентів');
    console.log('view_groups - Переглянути усі групи');
    console.log('exit - Вийти з програми');
    console.log(' ')
    console.log(' ')
    console.log(' ')
}

// Функція для обробки командного рядка
function handleCommandLineInput() {
    rl.question('Введіть команду (для виходу введіть "exit"): ', (command) => {
        switch (command) {
            case 'add_student':
                rl.question('Введіть назву групи: ', (groupName) => {
                    rl.question('Введіть ім\'я студента: ', (name) => {
                        const student = new Student(name);
                        addStudentToGroup(groupName, student);
                        showCommands();
                        handleCommandLineInput();
                    });
                });
                break;
            case 'remove_student':
                rl.question('Введіть назву групи: ', (groupName) => {
                    rl.question('Введіть ім\'я студента: ', (name) => {
                        removeStudentFromGroup(groupName, name);
                    });
                });
                break;
            case 'add_group':
                rl.question('Введіть назву групи: ', (groupName) => {
                    addGroup(groupName);
                });
                break;
            case 'remove_group':
                rl.question('Введіть назву групи: ', (groupName) => {
                    removeGroup(groupName);
                });
                break;
            case 'change_name':
                rl.question('Введіть назву групи: ', (groupName) => {
                    rl.question('Введіть ім\'я студента: ', (name) => {
                        rl.question('Введіть нове ім\'я: ', (newName) => {
                            changeStudentName(groupName, name, newName);
                        });
                    });
                });
                break;
            case 'add_subject':
                rl.question('Введіть назву групи: ', (groupName) => {
                    rl.question('Введіть предмет: ', (subject) => {
                        addSubject(groupName, subject);
                    });
                });
                break;
            case 'remove_subject':
                rl.question('Введіть назву групи: ', (groupName) => {
                    rl.question('Введіть предмет: ', (subject) => {
                        removeSubject(groupName, subject);
                    });
                });
                break;
            case 'set_grade':
                rl.question('Введіть назву групи: ', (groupName) => {
                    rl.question('Введіть ім\'я студента: ', (name) => {
                        rl.question('Введіть предмет: ', (subject) => {
                            rl.question('Введіть оцінку: ', (grade) => {
                                setGrade(groupName, name, subject, parseInt(grade));
                            });
                        });
                    });
                });
                break;
            case 'get_grade':
                rl.question('Введіть назву групи: ', (groupName) => {
                    rl.question('Введіть ім\'я студента: ', (name) => {
                        rl.question('Введіть предмет: ', (subject) => {
                            getGrade(groupName, name, subject);
                        });
                    });
                });
                break;
            case 'view_subjects':
                rl.question('Введіть назву групи: ', (groupName) => {
                    viewSubjects(groupName);
                });
                break;
            case 'group_student_count':
                rl.question('Введіть назву групи: ', (groupName) => {
                    groupStudentCount(groupName);
                });
                break;
            case 'total_student_count':
                totalStudentCount();
                break;
            case 'view_students':
                viewStudents();
                break;
            case 'view_groups':
                viewGroups();
                break;
            case 'exit':
                rl.close();
                return;
            default:
                console.log('Невідома команда. Спробуйте ще раз.');
                showCommands();
                handleCommandLineInput();
        }
    });
}

function removeStudentFromGroup(groupName, studentName) {
    const group = university.groups.find(group => group.name === groupName);
    if (group) {
        group.removeStudent(studentName);
    } else {
        console.log(`Групи ${groupName} не існує.`);
    }
    showCommands();
    handleCommandLineInput();
}

function addGroup(groupName) {
    const existingGroup = university.groups.find(group => group.name === groupName);
    if (existingGroup) {
        console.log(`Група з назвою ${groupName} вже існує.`);
    } else {
        const group = new Group(groupName);
        university.addGroup(group);
        console.log(`Група ${groupName} додана.`);
    }
    showCommands();
    handleCommandLineInput();
}

function removeGroup(groupName) {
    university.removeGroup(groupName);
    showCommands();
    handleCommandLineInput();
}

function changeStudentName(groupName, studentName, newName) {
    const group = university.groups.find(group => group.name === groupName);
    if (group) {
        const student = group.students.find(student => student.name === studentName);
        if (student) {
            student.changeName(newName);
            console.log(`Ім'я студента ${studentName} змінено на ${newName}.`);
        } else {
            console.log(`Студента ${studentName} не знайдено в групі ${groupName}.`);
        }
    } else {
        console.log(`Групи ${groupName} не існує.`);
    }
    showCommands();
    handleCommandLineInput();
}

function addSubject(groupName, subject) {
    const group = university.groups.find(group => group.name === groupName);
    if (group) {
        group.addSubject(subject);
        console.log(`Предмет ${subject} доданий до групи ${groupName}.`);
    } else {
        console.log(`Групи ${groupName} не існує.`);
    }
    showCommands();
    handleCommandLineInput();
}

function removeSubject(groupName, subject) {
    const group = university.groups.find(group => group.name === groupName);
    if (group) {
        group.removeSubject(subject);
    } else {
        console.log(`Групи ${groupName} не існує.`);
    }
    showCommands();
    handleCommandLineInput();
}

function setGrade(groupName, studentName, subject, grade) {
    const group = university.groups.find(group => group.name === groupName);
    if (group) {
        const student = group.students.find(student => student.name === studentName);
        if (student) {
            student.setGrade(subject, grade);
        } else {
            console.log(`Студента ${studentName} не знайдено в групі ${groupName}.`);
        }
    } else {
        console.log(`Групи ${groupName} не існує.`);
    }
    showCommands();
    handleCommandLineInput();
}

function getGrade(groupName, studentName, subject) {
    const group = university.groups.find(group => group.name === groupName);
    if (group) {
        const student = group.students.find(student => student.name === studentName);
        if (student) {
            student.getGrade(subject);
        } else {
            console.log(`Студента ${studentName} не знайдено в групі ${groupName}.`);
        }
    } else {
        console.log(`Групи ${groupName} не існує.`);
    }
    showCommands();
    handleCommandLineInput();
}

function viewSubjects(groupName) {
    const group = university.groups.find(group => group.name === groupName);
    if (group) {
        group.viewSubjects();
    } else {
        console.log(`Групи ${groupName} не існує.`);
    }
    showCommands();
    handleCommandLineInput();
}

function groupStudentCount(groupName) {
    const group = university.groups.find(group => group.name === groupName);
    if (group) {
        console.log(`У групі ${groupName} ${group.getStudentCount()} студентів.`);
    } else {
        console.log(`Групи ${groupName} не існує.`);
    }
    showCommands();
    handleCommandLineInput();
}

function totalStudentCount() {
    console.log(`Загальна кількість студентів у ВНЗ: ${university.getTotalStudentCount()}.`);
    showCommands();
    handleCommandLineInput();
}

function viewStudents() {
    viewAllStudents();
    showCommands();
    handleCommandLineInput();
}

function viewGroups() {
    viewAllGroups();
    showCommands();
    handleCommandLineInput();
}


showCommands(); 
handleCommandLineInput();
