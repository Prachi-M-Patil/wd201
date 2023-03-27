let userform  = document.getElementById("user-form");

const retrieveEntries = () => {
    let entries = localStorage.getItem("user-entries");
    if (entries){
        entries = JSON.parse(entries);
    }
    else{
        entries = [];

    }
    return entries;
    }
    let userEntries = retrieveEntries ();
    
    const displayEntries = () => {
            const entries = retrieveEntries();
            let table_entries = entries.map((entry) => {
               const nameCell = `<td class='border px-4 py-2'> ${entry.name}</td>` ;
               const emailCell = `<td class='border px-4 py-2'> ${entry.email}</td>` ;
               const passwordCell = `<td class='border px-4 py-2'> ${entry.password}</td>` ;
               const dobCell = `<td class='border px-4 py-2'> ${entry.dob}</td>` ;
               const acceptTermsCell = `<td class='border px-4 py-2'>${entry.acceptedTermsAndConditions}</td>`;

               const row = `<tr>${nameCell} ${emailCell} ${passwordCell} ${dobCell} ${acceptTermsCell}</tr>`;

               return row;

            }).join("\n");

            let table = `<table class="table-auto w-full" style=" border: 1px solid;
            margin: 0;"><tr>
            
            <th class="px-4 py-2">Name</th>
            <th class="px-4 py-2">Email</th>
            <th class="px-4 py-2">Password</th>
            <th class="px-4 py-2">dob</th>
            <th class="px-4 py-2">accepted terms?</th>
</tr>${table_entries}</table>`;

let details = document.getElementById("table");
details.innerHTML = table;

}
const saveUserForm = (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;

    const acceptedTermsAndConditions = document.getElementById("acceptTerms").checked;
    
    let currentyear = new Date().getFullYear();
    let birthyear = dob.split("-");
    let year = birthyear[0];

    let age = currentyear - year;
    let isValid = (age) => {
        if (age > 55 || age < 18) {
            return false;
        } else {
            return true;
        }
    }
    if (!isValid(age)) {
        document.getElementById("dob").style = "border: 2px solid red;"
        return alert("You must be between age 18 and 55.\nYou are not elligible!");
    } else {
        document.getElementById("dob").style = "border: 2px solid #cccc;"

    const entry ={
        name,
        email,
        password,
        dob,
        acceptedTermsAndConditions
    };
    userEntries.push(entry);

    localStorage.setItem("user-entries",JSON.stringify(userEntries));
    displayEntries();
}



}


    userform.addEventListener("submit", saveUserForm);
    displayEntries();
