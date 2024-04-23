const { getAllUsers } = require('../Controllers/user.controller'); // Import the controller function
const User = require('../Models/user.model')

describe('getAllUsers', () => {
  test('should return all users when request is successful', async () => {
    const mockUsers = [{ name: 'User 1' }, { name: 'User 2' }]; // Mock user data
    User.find = jest.fn().mockResolvedValue(mockUsers); // Mock the find method of the User model
    
    const mockJson = jest.fn(); // Mock the json method of response object
    const mockRes = { json: mockJson }; // Mock response object
    
    await getAllUsers(null, mockRes); // Call the controller function
    
    expect(mockJson).toHaveBeenCalledWith(mockUsers); // Verify if json method was called with the mock users
  });

  test('should return 500 status code when an error occurs', async () => {
    User.find = jest.fn().mockRejectedValue(new Error('Database error')); // Mock the find method to throw an error
    
    const mockStatus = jest.fn().mockReturnThis(); // Mock the status method of response object
    const mockJson = jest.fn(); // Mock the json method of response object
    const mockRes = { status: mockStatus, json: mockJson }; // Mock response object
    
    await getAllUsers(null, mockRes); // Call the controller function
    
    expect(mockStatus).toHaveBeenCalledWith(500); // Verify if status method was called with 500
    expect(mockJson).toHaveBeenCalledWith({ error: 'Internal server error' }); // Verify if json method was called with the error message
  });
});
