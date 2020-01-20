Instructions:

1.- Run the server. 
    the server is dependent on node.js (install node.js first).
    From the terminal do npm run devStart.

2.- Connect the clients.
    run the Map application and the CarStub application in a browser, you should get an alert message 
    letting you know that this clients are connected to the server.

3.- Add cars to the map application using the CarStub app (data is sent through a web socket).

4.- To update a car's state, one has to click the "Update" button in the mock app, once this happens the car's
    state is updated and it is reflected  on the map application (this would simulate when a real 
    car passes through a point of interest).