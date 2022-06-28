import { dbank } from "../../declarations/dbank";

const  updateBalance = async function(){
  const currentAmount = await dbank.checkBalance();
  document.getElementById("value").innerText = Math.round(currentAmount * 100) / 100;
  
}

window.addEventListener("load", async function(){
  updateBalance()
})

document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const button = e.target.querySelector("#submit-btn");

  const inputAmount = parseFloat(document.getElementById("input-amount").value)
  const outAmount = parseFloat(document.getElementById("withdrawal-amount").value)
  button.setAttribute("disabled", true)
  if(inputAmount){
    await dbank.topUp(inputAmount);
    document.getElementById("input-amount").value = ""
  }
  if(outAmount){
    await dbank.withdraw(outAmount)
    document.getElementById("withdrawal-amount").value = ""
  }
  
  await updateBalance()
  button.removeAttribute("disabled")
  

});


