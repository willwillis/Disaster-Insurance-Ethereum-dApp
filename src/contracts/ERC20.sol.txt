pragma solidity ^0.5.0; 
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20Detailed.sol"; 


contract ArcadeToken is ERC20, ERC20Detailed {
     address payable owner;     
     modifier onlyOwner{
         require(msg.sender == owner, "You do not have permissions to call this method");
         _;
     }     
     
     constructor(uint initial_supply) ERC20Detailed("ArcadeToken", "ARCDWBW", 18) public {
        owner = msg.sender;
         _mint(owner, initial_supply);
     }     
     
     function mint(address recipient, uint amount) public onlyOwner {
         _mint(recipient, amount);
     }
 }