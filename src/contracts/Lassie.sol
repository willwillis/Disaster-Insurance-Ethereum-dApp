pragma solidity >=0.4.21 <0.6.0;

contract Lassie {
    string public name;
    uint public sensorCount = 0;
    mapping(uint => Sensor) public sensors;
    
    struct Sensor {
        uint id;
        string name;
        address owner;
        string lat;
        string lon;
        string endpoint;
    }
    
    event SensorCreated(
        uint id,
        string name,
        address owner,
        string lat,
        string lon,
        string endpoint
    );
    
    event publishWSContractState(
        uint contractState,
        uint responderState,
        string sensorName,
        uint sensorCount,
        bool smokeThresholdBreached,
        bool temperatureThresholdBreached
    );

    event somebodyGotPaid(
        uint amount
    );

    function createSensor(string memory _name, string memory _lat, string memory _lon, string memory _endpoint) public {
        // validate we got something...
        // TODO, actually validate...
        require(bytes(_name).length > 0);
        require(bytes(_lat).length > 0);
        require(bytes(_lon).length > 0);
        require(bytes(_endpoint).length > 0);

        sensorCount ++;
        // Create the sensor
        sensors[sensorCount] = Sensor(sensorCount, _name, msg.sender , _lat, _lon, _endpoint);
        // Trigger an event
        emit SensorCreated(sensorCount, _name, msg.sender, _lat, _lon, _endpoint);
    }
    


    // STATE VARIABLES
    uint public contractState;  // 1 = OK    2 = WARNING   3 = CRITICAL
    uint public responderState; // 1 = OK    2 = PREPPED    3 = RESPOND
    // RESPONDER Payment Amounts
    uint256 public responderPrepAmount = 1 wei;
    uint256 public responderRespondAmount = 2 wei;

    // SENSOR VARIABLES
    bool public smokeThresholdBreached;        // false = No Smoke    true = There's SMOKE
    bool public temperatureThresholdBreached;  // false = Temp OK     true = Too HOT

    // ADDRESSES
    address contractManager; //= 0x443B02B822a19BB96e64a9A673EdAA4027eD9b62;  // That's US, this is OUR account
    address escrow    = address(this); // We PAY into this account (0x00786bBE030bB178693687c22ffCE593F51D904c)
    address responder = 0x00786bBE030bB178693687c22ffCE593F51D904c;  // The Fire company

    // Constructor code is only run when the contract
    // is created
    constructor(string memory _name, uint8 _contractState, uint8 _responderState ) public payable {
        contractManager = msg.sender;
        contractState  = _contractState;
        responderState =  _responderState;
        name = _name;
        smokeThresholdBreached = false;
        temperatureThresholdBreached = false;
        address(this).transfer(msg.value);
    }

    // interface for IoT Sensors (AWS)
    // @TODO Lock Down to Local Addy Later
    // @TODO accept a sensorID, and set state on Sensor
 function setSmoke( bool _newVal, string memory _sensorName) public {
        smokeThresholdBreached = _newVal;
        if (temperatureThresholdBreached == true){
            setResponderState(2,_sensorName);
            if (smokeThresholdBreached == true) {
                setResponderState(3,_sensorName);
            }
        } 
    }

    function setTemperature (bool _newVal, string memory _sensorName) public {
        temperatureThresholdBreached = _newVal;
        if (smokeThresholdBreached == true){
            setResponderState(2,_sensorName);
            if (temperatureThresholdBreached == true) {
                setResponderState(3,_sensorName);
            }
        }
    }
    
    function transferEther(uint _amount) public payable {
        address(0x00786bBE030bB178693687c22ffCE593F51D904c).transfer(_amount);
        emit somebodyGotPaid(_amount);
    }

    function setResponderState(uint _newState, string memory _sensorName ) private {
        // @TODO add abi encoding
        responderState = _newState;

        if (responderState == 2) {
            contractState = 2;
            responderState = 2;
            transferEther(responderPrepAmount);
        }
        if (responderState == 3) {
            contractState = 3;
            responderState = 3;
            transferEther(responderRespondAmount);
        } else {
            // not sure how we'd even get here.
        }

        emit  publishWSContractState(
            contractState,
            responderState,
            _sensorName,
            sensorCount,
            smokeThresholdBreached,
            temperatureThresholdBreached
        );
    }  
    
    function () external payable {}
}
