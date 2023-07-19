// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {AccessControlUpgradeable} from "@openzeppelin-upgradeable/access/AccessControlUpgradeable.sol";
import {ERC721Upgradeable} from "@openzeppelin-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import {UUPSUpgradeable} from "@openzeppelin-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import {Initializable} from "@openzeppelin-upgradeable/proxy/utils/Initializable.sol";
import {OwnableUpgradeable} from "@openzeppelin-upgradeable/access/OwnableUpgradeable.sol";

import {IAggregator} from "@knowyourcat/sdk/interfaces/IAggregator.sol";

error EmptySources();
error TokenDoesNotExist();
error TransferNotAllowed();

contract Category is Initializable, ERC721Upgradeable, AccessControlUpgradeable, UUPSUpgradeable, OwnableUpgradeable {
    bytes32 public constant UPGRADER_ROLE = keccak256("UPGRADER_ROLE");

    string private _baseTokenURI;
    IAggregator private _aggregator;
    uint256[] private _sources;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(
        string memory name,
        string memory symbol,
        string memory baseTokenURI,
        IAggregator aggregator,
        uint256[] memory sources
    ) public initializer {
        if (sources.length == 0) {
            revert EmptySources();
        }

        _baseTokenURI = baseTokenURI;
        _aggregator = aggregator;
        _sources = sources;

        __ERC721_init(name, symbol);
        __Ownable_init();
        __AccessControl_init();
        __UUPSUpgradeable_init();

        _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
        _setupRole(UPGRADER_ROLE, _msgSender());
    }

    function version() external pure returns (uint256) {
        return 2;
    }

    function getImplementation() external view returns (address) {
        return _getImplementation();
    }

    function setSources(uint256[] memory sources) external onlyRole(UPGRADER_ROLE) {
        _sources = sources;
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override (AccessControlUpgradeable, ERC721Upgradeable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function balanceOf(address owner) public view override returns (uint256) {
        return _exists(owner) ? 1 : 0;
    }

    function ownerOf(uint256 tokenId) public view override returns (address) {
        address owner = tokenIdToAddress(tokenId);
        if (!_exists(owner)) {
            revert TokenDoesNotExist();
        }
        return owner;
    }

    function exists(uint256 tokenId) public view returns (bool) {
        return _exists(tokenId);
    }

    function addressToTokenId(address account) public pure returns (uint256) {
        return uint256(uint160(account));
    }

    function tokenIdToAddress(uint256 tokenId) public pure returns (address) {
        return address(uint160(tokenId));
    }

    function _authorizeUpgrade(address newImplementation) internal override onlyRole(UPGRADER_ROLE) {}

    function _baseURI() internal view virtual override returns (string memory) {
        return _baseTokenURI;
    }

    function _beforeTokenTransfer(address, /* from */ address, /* to */ uint256, /* tokenId */ uint256 /* batchSize */ )
        internal
        pure
        override
    {
        revert TransferNotAllowed();
    }

    function _exists(uint256 tokenId) internal view override returns (bool) {
        address owner = tokenIdToAddress(tokenId);
        return _exists(owner);
    }

    function _exists(address owner) internal view returns (bool) {
        bool possess = false;
        for (uint256 i = 0; i < _sources.length; i++) {
            possess = possess || _aggregator.isSynced(_sources[i], owner).payload > 0;
        }
        return possess;
    }
}
