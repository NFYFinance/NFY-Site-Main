var web3;
web3 = new Web3(Web3.givenProvider);
var nfyToken;
var LPTokens;
var accounts;
var nfyStaking;
var nfyStakingNFT;
var lpStaking;
var lpStakingNFT;

var wEth;

var nfyStakingV1;
var lpStakingV1;

var tradingPlatform;

var rewardPoolAddress = "0x2f822dA8016d5e8ce3c93b53eE1528392Ca3ac57";
var lpAddress = "0x146d3401b6a41122bd318ba676a01c44cb0795e2"
var lpStakingAddress = "0xc05846592d811B27c67B1267F189611775fcC2dD";
var nfyStakingAddress = "0xB211603591C44C720d8b96FEec8a57cFCDAfb763";
var tradingPlatformAddress = "0xF8c8DD8d68CfDDcACD23c7112C9a104A1F1B95c1"

var maxAllowance = 1157920892373161954235709850086879078532699846656405;


$(document).ready(async function() {

   connect();

   console.log(nfyToken);

   $(".connect_button").click(connect);
   $("#stake-nfy").click(stakeNfy);
   $("#unstake-nfy").click(unstakeNfy);
   $("#claim-nfy").click(claimNfyRewards);
   $("#compound-nfy").click(compoundNfyRewards);
   $("#submit-lp-stake").click(stakeLp);
   $("#claim-lp-rewards").click(claimLpRewards);

   $("#unstake-nfy-v1").click(unstakeNFYV1);
   $("#unstake-lp-v1").click(unstakeLPV1);

   $("#deposit-button").click(deposit);

   $("#deposit-button").click(getNFTs);


   $("#withdraw-button").click(withdraw);

   $("#btn-buy-nfy").click(nfyBuyOrder);
   $("#btn-sell-nfy").click(nfySellOrder);

   $("#btn-buy-nfylp").click(nfyLPBuyOrder);
   $("#btn-sell-nfylp").click(nfyLPSellOrder);


})

function trim(number, precision){
    var array = number.toString().split(".");
    array.push(array.pop().substring(0, precision));
    var trimmedNumber =  array.join(".");
    return(trimmedNumber);
}

function nfyInRewardPool() {
    nfyToken.methods.balanceOf(rewardPoolAddress).call().then(function(res){
        res = res / 1000000000000000000;

        $("#nfy-reward-pool").text(res.toFixed(2));
    })
}

function stakeNfy() {

    nfyToken.methods.allowance(accounts[0], nfyStakingAddress).call().then(function(res){
        if(res == 0){
            nfyToken.methods.approve(nfyStakingAddress, (BigInt(maxAllowance)).toString()).send()

            .on("transactionHash", function(hash){
                console.log(hash);
            })

            .on("confirmation", function(confirmationNr){
                console.log(confirmationNr);
            })

            .on("receipt", function(receipt){
                console.log(receipt);
            })
        }

        else {
            var stakeVal = $("#input-nfy-stake").val();

            var stake = web3.utils.toWei(stakeVal, "ether");

            nfyStaking.methods.stakeNFY(stake).send()

            .on("transactionHash", function(hash){
                console.log(hash);
            })

            .on("confirmation", function(confirmationNr){
                console.log(confirmationNr);
            })

            .on("receipt", function(receipt){
                console.log(receipt);
            })
        }
    })

}

function unstakeNfy() {
    nfyStaking.methods.unstakeAll().send()

    .on("transactionHash", function(hash){
        console.log(hash);
    })

    .on("confirmation", function(confirmationNr){
        console.log(confirmationNr);
    })

    .on("receipt", function(receipt){
        console.log(receipt);
    })
}

function compoundNfyRewards() {
    nfyStaking.methods.compoundAllRewards().send()

    .on("transactionHash", function(hash){
        console.log(hash);
    })

    .on("confirmation", function(confirmationNr){
        console.log(confirmationNr);
    })

    .on("receipt", function(receipt){
        console.log(receipt);
    })
}

function claimNfyRewards() {
    nfyStaking.methods.claimAllRewards().send()

    .on("transactionHash", function(hash){
        console.log(hash);
    })

    .on("confirmation", function(confirmationNr){
        console.log(confirmationNr);
    })

    .on("receipt", function(receipt){
        console.log(receipt);
    })
}

function getNfyBalance() {
    // Get NFY balance
    nfyToken.methods.balanceOf(accounts[0]).call().then(function(res){
        res = res / 1000000000000000000;

        //$(".nfy-balance").text(res.toFixed(4));
        $(".nfy-balance").text(trim(res, 4));
    })
}

function getTotalNfyStaked() {
    nfyStaking.methods.totalStaked().call().then(function(res){
        res = res / 1000000000000000000;

        $("#total-nfy-staked").text(res.toFixed(4) + " NFY");
    })
}

function getUserStakedNfy() {
    nfyStaking.methods.getTotalBalance(accounts[0]).call().then(function(res){
        res = res / 1000000000000000000;

        $(".nfy-staked").text(res.toFixed(4));
    })
}

function getUserNfyNfts() {
    nfyStakingNFT.methods.balanceOf(accounts[0]).call().then(function(res){
        $("#total-nfy-nfts").text(res);
    })
}

function getNfyAPY() {
    var rewardPerBlock;
    nfyStaking.methods.getRewardPerBlock().call().then(function(rpb){
        rewardPerBlock = rpb;
    })

    nfyStaking.methods.totalStaked().call().then(function(staked){
        if(staked == 0){
            $("#nfy-apy").text('0' + "%");
        }

        else{
            var apy = rewardPerBlock * 6500 * 366 * 100 / staked;
            $("#nfy-apy").text(apy.toFixed(2) + "%");
        }
    })
}

function getUserNfyRewards() {
    nfyStaking.methods.getTotalRewards(accounts[0]).call().then(function(res){
        res = res / 1000000000000000000;

        $(".nfy-rewards").text(res.toFixed(4) + " NFY");
    })
}

function stakeLp() {

    LPTokens.methods.allowance(accounts[0], lpStakingAddress).call().then(function(res){
        if(res == 0){
            LPTokens.methods.approve(lpStakingAddress, (BigInt(maxAllowance)).toString()).send()

            .on("transactionHash", function(hash){
                console.log(hash);
            })

            .on("confirmation", function(confirmationNr){
                console.log(confirmationNr);
            })

            .on("receipt", function(receipt){
                console.log(receipt);
            })
        }

        else {
            var stakeVal = $("#input-lp-stake").val();

            var stake = web3.utils.toWei(stakeVal, "ether");

            lpStaking.methods.stakeLP(stake).send()

            .on("transactionHash", function(hash){
                console.log(hash);
            })

            .on("confirmation", function(confirmationNr){
                console.log(confirmationNr);
            })

            .on("receipt", function(receipt){
                console.log(receipt);
            })
        }
    })

}

function claimLpRewards() {
    lpStaking.methods.claimAllRewards().send()

    .on("transactionHash", function(hash){
        console.log(hash);
    })

    .on("confirmation", function(confirmationNr){
        console.log(confirmationNr);
    })

    .on("receipt", function(receipt){
        console.log(receipt);
    })
}

function getTotalLpStaked() {
    lpStaking.methods.totalStaked().call().then(function(res){
        res = res / 1000000000000000000;

        $("#total-lp-staked").text(res.toFixed(4) + " NFY/ETH LP");
    })
}

function getUserStakedLp() {
    lpStaking.methods.getTotalBalance(accounts[0]).call().then(function(res){
        res = res / 1000000000000000000;

        $(".lp-staked").text(res.toFixed(4));
    })
}

function getUserLpNfts() {
    lpStakingNFT.methods.balanceOf(accounts[0]).call().then(function(res){
        $("#total-lp-nfts").text(res);
    })
}

function getLpAPY() {
    var rewardPerBlock;
    var nfyInLP;
    var totalLP;

    lpStaking.methods.getRewardPerBlock().call().then(function(rpb){
        rewardPerBlock = rpb;
    })

    nfyToken.methods.balanceOf(lpAddress).call().then(function(totalNfy){
        nfyInLP = totalNfy;
    })

    LPTokens.methods.totalSupply().call().then(function(lpTotal){
        totalLP = lpTotal;
    })

    lpStaking.methods.totalStaked().call().then(function(staked){
        if(staked == 0){
            $("#lp-apy").text('0' + "%");
        }

        else{

            var apy = (rewardPerBlock * 6500 * 366 * 100) / (staked * nfyInLP / totalLP * 2);
            $("#lp-apy").text(apy.toFixed(2) + "%");
        }
    })

}

function getUserLpRewards() {
    lpStaking.methods.getTotalRewards(accounts[0]).call().then(function(res){
        res = res / 1000000000000000000;

        $("#lp-rewards").text(res.toFixed(4) + " NFY");
    })
}

function getLPBalance() {

    // Get NFY balance
    LPTokens.methods.balanceOf(accounts[0]).call().then(function(res){
        res = res / 1000000000000000000;

        //$("#lp-balance").text(res.toFixed(4));
        $("#lp-balance").text(trim(res, 4));
    })
}

// Unstake NFY from V1 contract
function unstakeNFYV1() {
    nfyStakingV1.methods.unstakeAll().send()

    .on("transactionHash", function(hash){
        console.log(hash);
    })

    .on("confirmation", function(confirmationNr){
        console.log(confirmationNr);
    })

    .on("receipt", function(receipt){
        console.log(receipt);
    })
}

// Unstake LP from v1 Contract
function unstakeLPV1() {
    lpStakingV1.methods.unstakeAll().send()

    .on("transactionHash", function(hash){
        console.log(hash);
    })

    .on("confirmation", function(confirmationNr){
        console.log(confirmationNr);
    })

    .on("receipt", function(receipt){
        console.log(receipt);
    })
}

function checkIfV1LPUnstaked() {
    lpStakingV1.methods.getTotalBalance(accounts[0]).call().then(function(res){
        res = res / 1000000000000000000;

        if(res == 0) {
            document.getElementById("unstake-lp-v1").disabled = true;
            document.getElementById("unstake-lp-v1").value = "NO LP STAKED IN V1";
        }
    })
}

function checkIfV1NFYUnstaked() {
    nfyStakingV1.methods.getTotalBalance(accounts[0]).call().then(function(res){
        res = res / 1000000000000000000;

        if(res == 0) {
            document.getElementById("unstake-nfy-v1").disabled = true;
            document.getElementById("unstake-nfy-v1").value = "NO NFY STAKED IN V1";
        }
    })
}





// Trading Platform Functions

// NFY stake sell order
function nfySellOrder() {
    nfyToken.methods.allowance(accounts[0], tradingPlatformAddress).call().then(function(res){

        if(res == 0){
            nfyToken.methods.approve(tradingPlatformAddress, (BigInt(maxAllowance)).toString()).send()

            .on("transactionHash", function(hash){
                console.log(hash);
            })

            .on("confirmation", function(confirmationNr){
                console.log(confirmationNr);
            })

            .on("receipt", function(receipt){
                console.log(receipt);
            })
        }

        else {

            var nfyToSellVal = $("#quantity-sell-nfy").val();
            var nfyPriceVal = $("#price-sell-nfy").val();

            var nfyToSell = web3.utils.toWei(nfyToSellVal, "ether");
            var nfyPrice = web3.utils.toWei(nfyPriceVal, "ether");

            tradingPlatform.methods.createLimitOrder("nfy", nfyToSell, nfyPrice, 1).send()

            .on("transactionHash", function(hash){
                console.log(hash);
            })

            .on("confirmation", function(confirmationNr){
                console.log(confirmationNr);
            })

            .on("receipt", function(receipt){
                console.log(receipt);
            })
        }
    })
}

// NFY stake buy order
function nfyBuyOrder() {

    nfyToken.methods.allowance(accounts[0], tradingPlatformAddress).call().then(function(res){

        if(res == 0){
            nfyToken.methods.approve(tradingPlatformAddress, (BigInt(maxAllowance)).toString()).send()

            .on("transactionHash", function(hash){
                console.log(hash);
            })

            .on("confirmation", function(confirmationNr){
                console.log(confirmationNr);
            })

            .on("receipt", function(receipt){
                console.log(receipt);
            })
        }

        else {
            var nfyToBuyVal = $("#quantity-buy-nfy").val();
            var nfyPriceVal = $("#price-buy-nfy").val();

            var nfyToBuy = web3.utils.toWei(nfyToBuyVal, "ether");
            var nfyPrice = web3.utils.toWei(nfyPriceVal, "ether");

            tradingPlatform.methods.createLimitOrder("nfy", nfyToBuy, nfyPrice, 0).send()

            .on("transactionHash", function(hash){
                console.log(hash);
            })

            .on("confirmation", function(confirmationNr){
                console.log(confirmationNr);
            })

            .on("receipt", function(receipt){
                console.log(receipt);
            })
        }
    })
}

// NFY/ETH LP stake sell order
function nfyLPSellOrder() {
    nfyToken.methods.allowance(accounts[0], tradingPlatformAddress).call().then(function(res){

        if(res == 0){
            nfyToken.methods.approve(tradingPlatformAddress, (BigInt(maxAllowance)).toString()).send()

            .on("transactionHash", function(hash){
                console.log(hash);
            })

            .on("confirmation", function(confirmationNr){
                console.log(confirmationNr);
            })

            .on("receipt", function(receipt){
                console.log(receipt);
            })
        }

        else{

            var lpToSellVal = $("#quantity-sell-lp").val();
            var lpPriceVal = $("#price-sell-lp").val();

            var lpToSell = web3.utils.toWei(lpToSellVal, "ether");
            var lpPrice = web3.utils.toWei(lpPriceVal, "ether");

            tradingPlatform.methods.createLimitOrder("nfylp", lpToSell, lpPrice, 1).send()

            .on("transactionHash", function(hash){
                console.log(hash);
            })

            .on("confirmation", function(confirmationNr){
                console.log(confirmationNr);
            })

            .on("receipt", function(receipt){
                console.log(receipt);
            })
        }

    })

}

// NFY/ETH LP stake buy order
function nfyLPBuyOrder() {
    nfyToken.methods.allowance(accounts[0], tradingPlatformAddress).call().then(function(res){
        if(res == 0){
            nfyToken.methods.approve(tradingPlatformAddress, (BigInt(maxAllowance)).toString()).send()

            .on("transactionHash", function(hash){
                console.log(hash);
            })

            .on("confirmation", function(confirmationNr){
                console.log(confirmationNr);
            })

            .on("receipt", function(receipt){
                console.log(receipt);
            })
        }

        else {

            var lpToBuyVal = $("#quantity-buy-lp").val();
            var lpPriceVal = $("#price-buy-lp").val();

            var lpToBuy = web3.utils.toWei(lpToBuyVal, "ether");
            var lpPrice = web3.utils.toWei(lpPriceVal, "ether");

            tradingPlatform.methods.createLimitOrder("nfylp", lpToBuy, lpPrice, 0).send()

            .on("transactionHash", function(hash){
                console.log(hash);
            })

            .on("confirmation", function(confirmationNr){
                console.log(confirmationNr);
            })

            .on("receipt", function(receipt){
                console.log(receipt);
            })
        }

    })
}

function deposit() {
    var assetSelected;
    var depositAmount;
    var idSelected;

    assetSelected = $("#deposit-asset-select").find(":selected").val();
    depositAmount = $("#input-deposit-amount").val();

    idSelected = $("#deposit-scrollbox ul").children().eq(0).text();


    if(assetSelected == "eth"){
        var config = { value: web3.utils.toWei(depositAmount, "ether") }

        tradingPlatform.methods.depositEth().send(config)

        .on("transactionHash", function(hash){
            console.log(hash);
        })

        .on("confirmation", function(confirmationNr){
            console.log(confirmationNr);
        })

        .on("receipt", function(receipt){
            console.log(receipt);
        })
    }

    /*else {
        depositAmount = web3.utils.toWei(depositAmount, "ether");
        tradingPlatform.methods.depositStake(assetSelected, depositAmount)

        .on("transactionHash", function(hash){
            console.log(hash);
        })

        .on("confirmation", function(confirmationNr){
            console.log(confirmationNr);
        })

        .on("receipt", function(receipt){
            console.log(receipt);
        })
    }*/

    alert(assetSelected + " deposit");
    alert(depositAmount + " deposit");
    alert(idSelected);
}

function withdraw() {
    var assetSelected;
    var withdrawAmount;

    assetSelected = $("#deposit-asset-select").find(":selected").val();
    withdrawAmount = $("#input-deposit-amount").val();

    alert(assetSelected + "withdraw");
    alert(withdrawAmount + " withdraw");

    if(assetSelected == "eth"){
        withdrawAmount = web3.utils.toWei(withdrawAmount, "ether");

        tradingPlatform.methods.withdrawEth(withdrawAmount).send()

        .on("transactionHash", function(hash){
            console.log(hash);
        })

        .on("confirmation", function(confirmationNr){
            console.log(confirmationNr);
        })

        .on("receipt", function(receipt){
            console.log(receipt);
        })
    }

    else {
        withdrawAmount = web3.utils.toWei(withdrawAmount, "ether");

        tradingPlatform.methods.withdrawStake(assetSelected, withdrawAmount).send()

        .on("transactionHash", function(hash){
            console.log(hash);
        })

        .on("confirmation", function(confirmationNr){
            console.log(confirmationNr);
        })

        .on("receipt", function(receipt){
            console.log(receipt);
        })
    }


}

/*function getUserNfyLPNft() {
    var numLPNft;
    var token;

    lpStakingNFT.methods.balanceOf(accounts[0]).call().then(function(res){
        numLPNft = res;
        console.log(numLPNft)

        var i;

        for(i = 0; i < numLPNft; i++) {
            lpStakingNFT.methods.tokenOfOwnerByIndex(accounts[0], i).call().then(function(_token){
                token = _token;
                lpStaking.methods.getNFTBalance(token).call().then(function(_balance){
                    _balance = _balance / 1000000000000000000;
                    console.log(_balance);

                    console.log("NFY Stake Token ID: " + _token + " Value: " + _balance);

                })
            })
        }
    })

}*/

function getNFTs() {
    var assetSelected;

    $("#deposit-asset-select").on("change", function () {
        $("#deposit-scrollbox ul").remove();

        assetSelected = $("#deposit-asset-select").find(":selected").val();

        if(assetSelected == "nfylp"){

            lpStakingNFT.methods.balanceOf(accounts[0]).call().then(function(res){
            numLPNft = res;
            console.log(numLPNft)

                var i;

                for(i = 0; i < numLPNft; i++) {
                    lpStakingNFT.methods.tokenOfOwnerByIndex(accounts[0], i).call().then(function(_token){
                        token = _token;
                        lpStaking.methods.getNFTBalance(token).call().then(function(_balance){
                            _balance = _balance / 1000000000000000000;
                            console.log(_balance);

                            console.log("NFY LP Stake Token ID: " + _token + " Value: " + _balance);

                            $("#mCSB_5_container").append("<ul class=\"three-col\"></ul");

                            $("#mCSB_5_container ul:last").each(function(){
                                $(this).addClass("nfy-eth-asset");
                                $(this).removeClass("nfy-asset");

                                $(this).append("<li>ID " + _token + "</li>");
                                $(this).append("<li>Value: " + _balance + "</li>");

                                //$(this).children().first().html("ID: " + _token);
                                //$(this).children().eq(1).html("Value: " + _balance);
                                //$(this).children().first().html("NFY-ETH LP / NFT <span class=\"nfy-eth-id\">123</span>");
                            });

                        })
                    })
                }
            })
        }

        else if(assetSelected == "nfy"){
            nfyStakingNFT.methods.balanceOf(accounts[0]).call().then(function(res){
            numLPNft = res;
            console.log(numLPNft)

                var i;

                for(i = 0; i < numLPNft; i++) {
                    nfyStakingNFT.methods.tokenOfOwnerByIndex(accounts[0], i).call().then(function(_token){
                        token = _token;
                        nfyStaking.methods.getNFTBalance(token).call().then(function(_balance){
                            _balance = _balance / 1000000000000000000;
                            console.log(_balance);

                            console.log("NFY Stake Token ID: " + _token + "Value: " + _balance);

                            $("#mCSB_5_container").append("<ul class=\"three-col\"></ul");

                            $("#mCSB_5_container ul:last").each(function(){
                                $(this).addClass("nfy-asset");
                                $(this).removeClass("nfy-eth-asset");

                                $(this).append("<li>ID " + _token + "</li>");
                                $(this).append("<li>Value: " + _balance + "</li>");

                                //$(this).children().first().html("ID: " + _token);
                                //$(this).children().eq(1).html(" Value: " + _balance);
                                //$(this).children().first().html("NFY LP / NFT <span class=\"nfy-id\">123</span>");
                            });

                        })
                    })
                }
            })

        }
    });

}

// Function that gets NFY Price
function getNFYPrice() {
    var nfyPrice;

    wEth.methods.balanceOf(lpAddress).call().then(function(eth){
        eth = eth / 1000000000000000000

        nfyToken.methods.balanceOf(lpAddress).call().then(function(nfy){
            nfy = nfy / 1000000000000000000;

            nfyPrice = (eth / nfy).toFixed(5);

            console.log(nfyPrice);

            $("#price-sell-nfy").attr("value", nfyPrice);
            $("#price-buy-nfy").attr("value", nfyPrice);
        })
    })
}

// Function that gets LP Price
function getLPPrice() {
    var lpPrice;

    LPTokens.methods.totalSupply().call().then(function(lpTotal){
        lpTotal = lpTotal / 1000000000000000000;

        wEth.methods.balanceOf(lpAddress).call().then(function(eth){
            eth = eth / 1000000000000000000;

            lpPrice = (2 * eth / lpTotal).toFixed(5);

            $("#price-sell-lp").attr("value", lpPrice);
            $("#price-buy-lp").attr("value", lpPrice);
        })
    })


}

// Function that gets user's balance in trading platform
function getBalances() {
    var ethBalance;
    var assetBalance;
    var assetSelected;

    $("#deposit-asset-select").on("change", function () {

        assetSelected = $("#deposit-asset-select").find(":selected").val();

        if(assetSelected == "eth"){

            tradingPlatform.methods.getEthBalance(accounts[0]).call().then(function(eth){
                ethBalance = eth / 1000000000000000000;
                $("#input-deposit-value").attr("value", ethBalance)
            });
        }

        else {
            tradingPlatform.methods.getTraderBalance(accounts[0], assetSelected).call().then(function(bal){
                assetBalance = bal / 1000000000000000000;
                $("#input-deposit-value").attr("value", assetBalance)
            });
        }

    });

    tradingPlatform.methods.getTraderBalance(accounts[0], "nfy").call().then(function(bal){
        bal = bal / 1000000000000000000;
        $("#nfyDeposited").text(bal)
    })

    tradingPlatform.methods.getTraderBalance(accounts[0], "nfylp").call().then(function(bal){
        bal = bal / 1000000000000000000;
        $("#lpDeposited").text(bal)
    })
}

function getOrders() {

    tradingPlatform.methods.getOrders("nfy", 1).call().then(function(orders){

        for(i = 0; i < orders.length; i++){
            console.log(orders[i]);
            var amount = orders[i].amount - orders[i].filled;
            $("#mCSB_1_container").append("<ul class=\"three-col\"></ul");
            $("#mCSB_1_container ul:last").append("<li>" + orders[i].price / 1e18 + "</li");
            $("#mCSB_1_container ul:last").append("<li>"+ amount / 1e18 + "</li");
            $("#mCSB_1_container ul:last").append("<li>"+ (amount / 1e18) * (orders[i].price / 1e18) + "</li");

        }
    });

    tradingPlatform.methods.getOrders("nfy", 0).call().then(function(orders){

        for(i = 0; i < orders.length; i++){
            console.log(orders[i]);
            var amount = orders[i].amount - orders[i].filled;
            $("#mCSB_2_container").append("<ul class=\"three-col\"></ul");
            $("#mCSB_2_container ul:last").append("<li>" + orders[i].price / 1e18 + "</li");
            $("#mCSB_2_container ul:last").append("<li>"+ amount / 1e18 + "</li");
            $("#mCSB_2_container ul:last").append("<li>"+ (amount / 1e18) * (orders[i].price / 1e18) + "</li");

        }
    });

    tradingPlatform.methods.getOrders("nfylp", 1).call().then(function(orders){

        for(i = 0; i < orders.length; i++){
            console.log(orders[i]);
            var amount = orders[i].amount - orders[i].filled;
            $("#mCSB_3_container").append("<ul class=\"three-col\"></ul");
            $("#mCSB_3_container ul:last").append("<li>" + orders[i].price / 1e18 + "</li");
            $("#mCSB_3_container ul:last").append("<li>"+ amount / 1e18 + "</li");
            $("#mCSB_3_container ul:last").append("<li>"+ (amount / 1e18) * (orders[i].price / 1e18) + "</li");

        }
    });

    tradingPlatform.methods.getOrders("nfylp", 0).call().then(function(orders){

        for(i = 0; i < orders.length; i++){
            console.log(orders[i]);
            var amount = orders[i].amount - orders[i].filled;
            $("#mCSB_4_container").append("<ul class=\"three-col\"></ul");
            $("#mCSB_4_container ul:last").append("<li>" + orders[i].price / 1e18 + "</li");
            $("#mCSB_4_container ul:last").append("<li>"+ amount / 1e18 + "</li");
            $("#mCSB_4_container ul:last").append("<li>"+ (amount / 1e18) * (orders[i].price / 1e18) + "</li");
        }
    });
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
    /*nfyToken = new web3.eth.Contract(NFYAbi, "0x1cBb83EbcD552D5EBf8131eF8c9CD9d9BAB342bC", {from: accounts[0]});
    LPTokens = new web3.eth.Contract(LPAbi, "0x146D3401B6a41122Bd318ba676A01c44cB0795E2", {from: accounts[0]});

    nfyStakingV1 = new web3.eth.Contract(NFYStakingABIV1, "0x9F18363fF3AB60Fdf7DCAcA8564a48ea0790b9B3", {from: accounts[0]});
    lpStakingV1 = new web3.eth.Contract(LPStakingABIV1, "0x8D8daF6658d3aD3b329225fe7ca99E2787A101BA", {from: accounts[0]});

    nfyStaking = new web3.eth.Contract(NFYStakingABI, "0xB211603591C44C720d8b96FEec8a57cFCDAfb763", {from: accounts[0]});
    nfyStakingNFT = new web3.eth.Contract(NFYStakingNFTABI, "0x017bBa5d5D32feb687FDAfB9700418d55dAad091", {from: accounts[0]});

    lpStaking = new web3.eth.Contract(LPStakingABI, "0xc05846592d811B27c67B1267F189611775fcC2dD", {from: accounts[0]});
    lpStakingNFT = new web3.eth.Contract(LPStakingNFTABI, "0x320f0005364E755136cB72955fdc842F18E21ae7", {from: accounts[0]});

    wEth = new web3.eth.Contract(WETHABI, "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", {from: accounts[0]});*/

    nfyToken = new web3.eth.Contract(NFYAbi, "0xAE10Aed5806F12CE3F09B81D69d5754cB22bE7fC", {from: accounts[0]});
    LPTokens = new web3.eth.Contract(LPAbi, "0xc1b8D728813acfe6de36aBCF3C4828F2A84A1C7C", {from: accounts[0]});

    nfyStakingV1 = new web3.eth.Contract(NFYStakingABIV1, "0x5f7702b8D3c075Dd7a856C1Aac2A69eFFF4Ae59a", {from: accounts[0]});
    lpStakingV1 = new web3.eth.Contract(LPStakingABIV1, "0x40cE081969A7f3af69d17c6Ba07F536DaF728Cbb", {from: accounts[0]});

    nfyStaking = new web3.eth.Contract(NFYStakingABI, "0x5f7702b8D3c075Dd7a856C1Aac2A69eFFF4Ae59a", {from: accounts[0]});
    nfyStakingNFT = new web3.eth.Contract(NFYStakingNFTABI, "0x21C37435f1F70975e5010F8864507fec910b3496", {from: accounts[0]});

    lpStaking = new web3.eth.Contract(LPStakingABI, "0x40cE081969A7f3af69d17c6Ba07F536DaF728Cbb", {from: accounts[0]});
    lpStakingNFT = new web3.eth.Contract(LPStakingNFTABI, "0x62f8Ceb1FCC8526A6d82E59fd7930836074fBDE9", {from: accounts[0]});

    wEth = new web3.eth.Contract(WETHABI, "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", {from: accounts[0]});

    tradingPlatform; // Trading platform address
    tradingPlatform = new web3.eth.Contract(TradingABI, "0xF8c8DD8d68CfDDcACD23c7112C9a104A1F1B95c1", {from: accounts[0]});

    getNfyBalance();
    getLPBalance();

    getTotalNfyStaked();
    getUserStakedNfy();
    getUserNfyNfts();
    getNfyAPY();
    getUserNfyRewards();

    getTotalLpStaked();
    getUserStakedLp();
    getUserLpNfts();
    getLpAPY();
    getUserLpRewards();

    //getUserNfyLPNft();

    nfyInRewardPool();

    checkIfV1NFYUnstaked();
    checkIfV1LPUnstaked();

    getNFYPrice();
    getLPPrice();

    getBalances();
    getNFTs();

    getOrders();

    connected();
}
