
export const testUser = async (req, res) => {
    res.json({
      success: true,
      message: "this is a testing message from user Controller",
    });
}