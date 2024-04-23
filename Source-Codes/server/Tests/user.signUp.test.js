// const { signUp } = require('../Controllers/user.controller'); // Import the controller function
// const User = require('../Models/user.model')

// describe('signUp', () => {
//     it('should return an error if required fields are missing', async () => {
//       const reqWithoutName = { body: { email: 'test@example.com', password: 'password123', role: 'user' } };
//       const reqWithoutEmail = { body: { name: 'Test User', password: 'password123', role: 'user' } };
  
//       await signUp(reqWithoutName, res);
//       expect(res.status).toHaveBeenCalledWith(400);
//       expect(res.json).toHaveBeenCalledWith({ errors: expect.any(Array) });
  
//       await signUp(reqWithoutEmail, res);
//       expect(res.status).toHaveBeenCalledWith(400);
//       expect(res.json).toHaveBeenCalledWith({ errors: expect.any(Array) });
//     });
  
//     it('should handle internal server errors', async () => {
//       // Mock the findOne method of the User model to throw an error
//       User.findOne.mockRejectedValueOnce(new Error('Database connection failed'));
  
//       await signUp(req, res);
//       expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
//       expect(User.prototype.save).not.toHaveBeenCalled();
//       expect(res.status).toHaveBeenCalledWith(500);
//       expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
//     });
  
//     // Add more test cases as needed
//   });
  