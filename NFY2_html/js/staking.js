var web3;
web3 = new Web3(Web3.givenProvider);
var contractInstance;
var LPTokens
var accounts;


$(document).ready(async function() {

   connect();

   console.log(contractInstance);

   $(".connect_button").click(connect);

})



function alert () {

}

function getNfyBalance() {

    // Get NFY balance
    contractInstance.methods.balanceOf(accounts[0]).call().then(function(res){
    res = res / 1000000000000000000;

        $("#nfy-balance").text("YOUR NFY BALANCE : " + res);
    })
}

function getLPBalance() {

    // Get NFY balance
    LPTokens.methods.balanceOf(accounts[0]).call().then(function(res){
    res = res / 1000000000000000000;

        $("#lp-balance").text("YOUR NFY/ETH LP BALANCE : " + res);
    })
}

function connected() {
    var accountsAbrv = accounts[0].slice(0,7);
    $(".connect_button").text("CONNECTED TO: " + accountsAbrv + "...");
}



async function connect() {
    try {
        let web3;
        if(window.ethereum) {
            web3 = new Web3(window.ethereum);
            console.log('window.eth');
            await ethereum.enable();
        }


        else if(window.web3) {
            wen3 = new Web3(window.web3.currentProvider);
            console.log('web3');
        }
    }

    catch (error) {

      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }

    accounts = await web3.eth.getAccounts();
    contractInstance = new web3.eth.Contract(NFYAbi, "0x1cBb83EbcD552D5EBf8131eF8c9CD9d9BAB342bC", {from: accounts[0]});
    LPTokens = new web3.eth.Contract(LPAbi, "0x146D3401B6a41122Bd318ba676A01c44cB0795E2", {from: accounts[0]});
    console.log(contractInstance);
    console.log(accounts[0]);

    getNfyBalance();
    getLPBalance();
    connected();


}


function getOwner() {


}