// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MMX is ERC20, Ownable {
    uint256 public constant MAX_TOTAL_SUPPLY = 500000000 ether;
    uint256 public blockCooldownAmount;
    mapping(address => uint256) private lastTxByAddress;
    bool public txChecker;

    event TxChecker(bool action, uint256 blockCooldownAmount);

    constructor(
        string memory _name,
        string memory _symbol,
        address to,
        uint256 _blockCooldownAmount
    ) ERC20(_name, _symbol) {
        txChecker = true;
        blockCooldownAmount = _blockCooldownAmount;
        _mint(to, MAX_TOTAL_SUPPLY);
    }

    function burn(uint256 amount) external {
        _burn(msg.sender, amount);
    }

    function setTxChecker(bool action, uint256 _blockCooldownAmount)
        external
        onlyOwner
    {
        txChecker = action;
        blockCooldownAmount = _blockCooldownAmount;
        emit TxChecker(action, _blockCooldownAmount);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override {
        amount;
        if (txChecker) {
            ensureMaxTxFrequency(from);
            lastTxByAddress[from] = block.number;
            ensureMaxTxFrequency(to);
            lastTxByAddress[to] = block.number;
        }
    }

    function ensureMaxTxFrequency(address addr) internal virtual {
        bool isAllowed = lastTxByAddress[addr] == 0 ||
            ((lastTxByAddress[addr] + blockCooldownAmount) <
                (block.number + 1));
        require(isAllowed, "Max tx frequency exceeded!");
    }
}
