import bcrypt from 'bcrypt';

const users = [];

export const createUser = async (req, res) => {
    const { username, password } = req.body;
    console.log(username, password);
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = users.find(u => u.username === username);
    if(user){
        return res.status(400).send({ message: 'User already exists' });
    }
    users.push({ username, password: hashedPassword });

    res.status(201).send({ message: `User ${username} created successfully.` });
};

export const loginUser=async(req,res)=>{
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);
    if (!user) {
        return res.status(400).send({ message: 'Invalid credentials' });
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password);  
    if (!isPasswordValid) {
        return res.status(400).send({ message: 'Invalid credentials' });
    }

    res.send({ message: `User ${username} logged in successfully.` });
}