// import modules
require('prototype.spawn')();
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleWallRepairer = require('role.wallRepairer');
var roleMiner = require('role.miner');
var roleTransport = require('role.transport');
var roleDefender = require('role.defender');
var roleRecover = require('role.recover');
var roleAttacker = require('role.attacker');

module.exports.loop = function () {
    // check for memory entries of died creeps by iterating over Memory.creeps
    for (let name in Memory.creeps) {
        // and checking if the creep is still alive
        if (Game.creeps[name] == undefined) {
            // if not, delete the memory entry
            delete Memory.creeps[name];
        }
    }

    // for every creep name in Game.creeps
    for (let name in Game.creeps) {
        // get the creep object
        var creep = Game.creeps[name];

    
        // if creep is upgrader, call upgrader script
        if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        // if creep is builder, call builder script
        else if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        // if creep is repairer, call repairer script
        else if (creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }
        //if creep is miner, call repairer script
        else if (creep.memory.role == 'miner') {
            roleMiner.run(creep);
        }
        // if creep is wallRepairer, call wallRepairer script
        else if (creep.memory.role == 'wallRepairer') {
            roleWallRepairer.run(creep);
        }
        else if (creep.memory.role == 'transport') {
            roleTransport.run(creep);
        }
        else if (creep.memory.role == 'defender') {
            roleDefender.run(creep);
        }
        else if (creep.memory.role == 'recover') {
            roleDefender.run(creep);
        }
        else if (creep.memory.role == 'attacker') {
            roleAttacker.run(creep);
        }
    }
    
/*    //WHEN LINK IS BUILT
    var linkFrom = Game.spawns.Home.room.lookForAt('structure', 5, 3)[0];
    var linkTo = Game.spawns.Home.pos.findInRange(FIND_MY_STRUCTURES, 2, 
        {filter: {structureType: STRUCTURE_LINK}})[0];
        linkFrom.transferEnergy(linkTo);
 */

    // setup some minimum numbers for different roles
    var minimumNumberOfUpgraders = 2;       //Good
    var minimumNumberOfBuilders = 0;        //Good
    var minimumNumberOfRepairers = 1;       //Good
    var minimumNumberOfWallRepairers = 0;
    var minimumNumberOfMiner = 3;           //Good
    var minimumNumberOfTransport = 4;       //Good
    var minimumNumberOfDefender = 0;        //Good
   // var minimumNumberOfAttacker = 0;

    // count the number of creeps alive for each role
    // _.sum will count the number of properties in Game.creeps filtered by the
    //  arrow function, which checks for the creep being a harvester
    var numberOfUpgraders = _.sum(Game.creeps, (c) => c.memory.role == 'upgrader');
    var numberOfBuilders = _.sum(Game.creeps, (c) => c.memory.role == 'builder');
    var numberOfRepairers = _.sum(Game.creeps, (c) => c.memory.role == 'repairer');
    var numberOfWallRepairers = _.sum(Game.creeps, (c) => c.memory.role == 'wallRepairer');
    var numberOfMiners = _.sum(Game.creeps, (c) => c.memory.role == 'miner');
    var numberOfTransport = _.sum(Game.creeps, (c) => c.memory.role == 'transport');
    var numberOfDefender = _.sum(Game.creeps, (c) => c.memory.role == 'defender');
    var numberOfrecover = _.sum(Game.creeps, (c) => c.memory.role == 'recover');
    var numberOfAttacker = _.sum(Game.creeps, (c) => c.memory.role == 'attacker');

    var energy = Game.spawns.Spawn1.room.energyAvailable;
    var name = undefined;
    
            
   
    // if not enough MINERS
    if (numberOfMiners < minimumNumberOfMiner) {
        // try to spawn miner
        name = Game.spawns.Spawn1.createCustomCreepM(energy, 'miner');
    }
    // if not enough TRANSPORTS
    if (numberOfTransport < minimumNumberOfTransport) {
        // try to spawn one
        name = Game.spawns.Spawn1.createCustomCreepT(energy, 'transport');
    }
    
    // if not enough UPGRADERS
    if (numberOfUpgraders < minimumNumberOfUpgraders) {
        name = Game.spawns.Spawn1.createCustomCreepU(energy, 'upgrader');
    } 
    // if not enough REPAIRERS
    if (numberOfRepairers < minimumNumberOfRepairers) {
        name = Game.spawns.Spawn1.createCustomCreepU(energy, 'repairer');
    } 
    
    
    /* 
    // if not enough DEFENDERS
    if (numberOfDefender < minimumNumberOfDefender) {
        name = Game.spawns.Home.createCustomCreepD(energy, 'defender');
    } 
    */
    // if not enough BUILDERS
    if (numberOfBuilders < minimumNumberOfBuilders) {
        name = Game.spawns.Spawn1.createCustomCreepU(energy, 'builder');
    }
    /*
    //if there are no MINERS or TRANSPORT spawn RECOVERY creep (uses different body parts)
    if (numberOfrecover < 3 && numberOfMiners || numberOfTransport == 0 ) {
        //spawn one with what is available
        name = Game.spawns.Home.createCustomCreepU(
            Game.spawns.Home.room.energyAvailable, 'recover');
    } 
    // if there are enough MINERS and TRANSPORTS, then suicide
    else if (numberOfMiners && numberOfTransport >= 4) {
        name = creep.suicide('recover')
    } */
    
};