// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import "./IERC20.sol";

contract Registration {
    IERC20 private _token;
    address private _organizer;
    uint256 private _registrationFee;

    mapping(address => bool) private _registered;

    event ParticipantRegistered(address participant);
    event RegistrationFeeUpdated(uint256 newFee);

    // Modifier to restrict access to the organizer only
    modifier onlyOrganizer() {
        // TODO
        _;
    }

    // Initialize the contract with the ERC20 token contract address and the registration fee
    constructor(IERC20 token, uint256 registrationFee) {
        // TODO
    }

    /**
     * @dev Returns the address of the LXBWS token
     */
    function token() public view virtual returns (IERC20) {
        return _token;
    }

    /**
     * @dev Returns the address of the event organizer
     */
    function organizer() public view virtual returns (address) {
        return _organizer;
    }

    /**
     * @dev Returns the current registration fee set by the organizer
     */
    function registrationFee() public view virtual returns (uint256) {
        return _registrationFee;
    }

    // Register a participant by transferring ERC20 tokens as a fee.
    // Make sure the participant has approved this contract to spend their tokens.
    // Emit the corresponding event if the registration is successful.

    /**
     * @dev Should register 'msg.sender' in the event. Includes updating the
     * 'registered' mapping and emitting the 'ParticipantRegistered' event.
     * Must transfer the registration fee in LxBWS tokens from the participant to
     * this contract.
     */
    function register() external {
        // TODO
    }

    /**
     * @dev Should allow the organizer to update the registration fee. Must emit
     * the 'RegistrationFeeUpdated' event.
     */
    function updateRegistrationFee(uint256 newFee) external onlyOrganizer {
        // TODO
    }

    /**
     * @dev Allows to check if a participant is registered in the event.
     */
    function isRegistered(address participant) external view returns (bool) {
        // TODO
    }
}
