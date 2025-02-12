// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import "./IERC20.sol";

contract LXBWS is IERC20 {
    string private _name = "Lisbon Blockchain Winter School Token";
    string private _symbol = "LXBWS";
    uint256 private _totalSupply;
    mapping(address account => uint256) private _balances;
    mapping(address account => mapping(address spender => uint256)) private _allowances;

    /**
     * @dev Returns the name of the token.
     */
    function name() public view virtual returns (string memory) {
        return _name;
    }

    /**
     * @dev Returns the symbol of the token, usually a shorter version of the
     * name.
     */
    function symbol() public view virtual returns (string memory) {
        return _symbol;
    }

    /**
     * @dev Returns the number of decimals used to get its user representation.
     * For example, if `decimals` equals `2`, a balance of `505` tokens should
     * be displayed to a user as `5.05` (`505 / 10 ** 2`).
     *
     * Tokens usually opt for a value of 18, imitating the relationship between
     * Ether and Wei. This is the default value returned by this function, unless
     * it's overridden.
     */
    function decimals() public view virtual returns (uint8) {
        return 0;
    }

    // Return the total supply of the token
    function totalSupply() public view virtual returns (uint256) {
        return _totalSupply;
    }

    // Return the balance of a specific account
    function balanceOf(address account) public view virtual returns (uint256) {
        return _balances[account];
    }

    // Transfer tokens to a recipient (i.e., subtract from the sender and add the same amount of tokens to the recipient)
    function transfer(address to, uint256 value) public virtual returns (bool) {
        require(_balances[msg.sender] >= value, "Insufficient balance");
        _balances[msg.sender] -= value;
        _balances[to] += value;
        emit Transfer(msg.sender, to, value);
        return true;
    }

    // Approve a spender to spend a specific amount of tokens on behalf of the sender
    // An example: Alice approves Bob to spend 100 tokens on her behalf
    // Bob can then call transferFrom to transfer tokens from Alice's account to another account
    function allowance(address owner, address spender) public view virtual returns (uint256) {
        return _allowances[owner][spender];
    }

    // View the allowance of a spender -- this function returns the amount of tokens that the owner has approved the spender to spend
    // An example: Alice approved Bob to spend 100 tokens on her behalf using the approve function
    // Bob can then call this function to check how many tokens he is allowed to spend on behalf of Alice
    function approve(address spender, uint256 value) public virtual returns (bool) {
        _allowances[msg.sender][spender] = value;
        emit Approval(msg.sender, spender, value);
        return true;
    }

    // Transfer tokens on behalf of another account (i.e., transfer tokens from a specific account to another account)
    function transferFrom(address from, address to, uint256 value) public virtual returns (bool) {
        require(_balances[from] >= value, "Insufficient balance");
        require(_allowances[from][msg.sender] >= value, "Allowance exceeded");

        _balances[from] -= value;
        _balances[to] += value;
        _allowances[from][msg.sender] -= value;
        emit Transfer(from, to, value);
        return true;
    }

    // Mint new tokens to an account (only for demonstration purposes)
    // Allows the contract owner to mint new tokens to an account
    function mint(address account, uint256 amount) public {

        // we first check if the address we are minting tokens to is the null address
        require(account != address(0), "Mint to the zero address");

        // since we are minting (creating) new tokens, we need to increase the total supply
        _totalSupply += amount;

        // we also need to increase the balance of the account we are minting tokens to
        _balances[account] += amount;

        // we emit a Transfer event to log the minting of new tokens
        emit Transfer(address(0), account, amount);
    }
}
