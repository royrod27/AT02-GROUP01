# AT02-GROUP01
Framework from scratch



WHAT IS IT?
------------

AT02-GROUP01 project based in JavaScript language,
Is a project oriented to test the different endpoints of RoomManager appplication,
through its Representational State Transfer(REST) API.

THE LATEST VERSION
------------------

Details of the latest version can be found in Github repository page: https://github.com/JFVF/AT02-GROUP01

ENVIRONMENT
-----------

Microsoft Exchange 2010 SP3

	- Windows Server 2012 R2 Standard
	- IIS 7 or latter with compatibility IIS6
	- .NET Framework 3.5
	- .NET Framework 3.5 SP1
	- Active Directory Domain Service (AD DS)
	- DNS

RoomManager

	- Windows Server 2012 R2 Standard
	- MongoDB
	- NodeJS
	- RoomManager

REQUIREMENTS
------------

To install the required dependencies for the framework, it is necessary to be in the path of the project, and execute the following command.

npm install

LIBRARIES
---------

The present project uses different libraries to test the different endpoints of RoomManager application.

	- lib\features\Attendees.js
	- lib\features\Locations.js
	- lib\features\Login.js
	- lib\features\Meetings.js
	- lib\features\OutOfOrders.js
	- lib\features\Resources.js
	- lib\features\RoomResources.js
	- lib\features\Rooms.js
	- lib\features\Services.js
	- lib\features\ServiceTypes.js
	- lib\helpers\GetterRoom.js
	- lib\helpers\header.js
	- lib\helpers\Requester.js
	- lib\helpers\room.js
	- lib\helpers\service.js
	- lib\helpers\ServiceGenerator.js
	- lib\helpers\token.js
	- lib\helpers\TokenGenerator.js


TESTS
-----

The following tests were implemented to test every endpoint of RoomManager application.

	- Smoke tests.
	- Acceptance tetst.
	- BDT

RUN TESTS
---------
- ALL TEST
        node node_modules\mocha\bin\_mocha test\ --recursive --reporter mochawesome
     or
        node node_modules\mocha\bin\_mocha test\ --recursive --reporter xunit-file

- SMOKE TESTS
        node node_modules\mocha\bin\_mocha test\smoke --recursive --reporter mochawesome
     or
        node node_modules\mocha\bin\_mocha test\smoke --recursive --reporter xunit-file

- ACCEPTANCE TESTS
        node node_modules\mocha\bin\_mocha test\acceptance --recursive --reporter mochawesome
     or
        node node_modules\mocha\bin\_mocha test\acceptance --recursive --reporter xunit-file

CONTACTS
--------

    - If you want to be informed about new code releases, bug fixes,
      security fixes, general news and information about the AT02-GROUP01 project
      check to the GitHub repository
      https://github.com/JFVF/AT02-GROUP01

CONTRIBUTORS
------------

Current contributors:
 * Fernando Iquiza(fernandoiquiza) - https://github.com/fernandoiquiza
 * Gualberto Villarroel(GualbertoVillarroel) - https://github.com/GualbertoVillarroel
 * Roy Rodriguez(royrod27) - https://github.com/royrod27
 * Sergio Landa(SergioLanda) - https://github.com/SergioLanda
