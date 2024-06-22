import Initiative from '../model/initiativeSchema.js';

export const addInitiative = async (req, res) => {
    const { name, description } = req.body;
  console.log(name, description);
  try {
    const newInit = new Initiative({ name, description });
    await newInit.save();
    return res.status(200).json({ message: "successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

export const getInitiative = async (req, res) => {
    try {
        const initiative = await Initiative.find();
        return res.json(initiative);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
      }
}