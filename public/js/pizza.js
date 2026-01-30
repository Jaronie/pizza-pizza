document.getElementById("pizza-form").onsubmit = () => {

    clearErrors();


    let isValid = true;

    let fname = document.getElementById("fname").value.trim();
    let lname = document.getElementById("lname").value.trim();
    let email = document.getElementById("email").value.trim();
    let pizza_size = document.getElementById("size");
    let pickup = document.getElementById("pickup");
    let delivery = document.getElementById("delivery");

    //Validate first name


    if (!fname){
        document.getElementById("err-fname").style.display = "block";
        isValid = false;
    }

    //Validate last name

    if (!lname){
        document.getElementById("err-lname").style.display = "block";
        isValid = false;
    }

    //Validate email
    if (!email)
    {
        document.getElementById("err-email").style.display = "block";
        isValid = false;
}
    //Validate pizza size
    if (pizza_size.value == "none")
    {
        document.getElementById("err-size").style.display = "block";
        isValid = false;
    }

    //Validate method
    if (!pickup.checked && !delivery.checked){
        document.getElementById("err-method").style.display = "block";
        isValid = false;
    }

    return isValid

}

function clearErrors(){
    let errors = document.getElementsByClassName("err");
    for (let i=0; i<errors.length; i++){
        errors[i].style.display = "none";
    }
}