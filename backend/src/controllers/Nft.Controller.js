import NFT_model from "../models/NftModel.js";

//Just testing the controller is working perfectly or not for the production based
export const testNft = async (req, res) => {
  res.json({
    success: true,
    message: "this is a testing message from NFT Controller",
  });
};
//New NFT creation
//POST METHOD
//PUBLIC API  = http://localhost:8800/api/v1/nft/new_nft

export const newNft = async (req, res) => {
  try {
    const {
      IPFS_hash,
      title,
      price,
      description,
      royalty_fee,
      NFT_token_ID,
      creator,
      owner,
    } = req.body;

    // Provide default values for required fields if not provided by the frontend
    // const creator_metamask_ID =
    //   req.body.creator_metamask_ID || "default_creator_metamask_ID";
    // const owner_metamask_ID =
    //   req.body.owner_metamask_ID || "default_owner_metamask_ID";

    const newNFT = await new NFT_model({
      IPFS_hash,
      NFT_token_ID,
      section_basic_info: {
        title,
        description,
        creator,
        owner,
      },
      section_price_info: {
        price_timeline: [{ timestamp: new Date(), price, royalty_fee }],
        transaction_history: [],
      },
      // section_additional_info: {
      //   tags: [],
      //   votes_count: 0,
      //   total_view_count: 0,
      //   views: [],
      //   comments: [],
      // },
      // section_services_info: {
      //   resnet50_lantent_space_vector: [],
      //   cached_resnet50_recommendations: [],
      // },
    });

    const result = await newNFT.save();
    res.status(201).json({
      success: true,
      message: "new NFT creation sucessfull",
      result,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};
//get recent NFTS
//GET METHOD
//PUBLIC API  = http://localhost:8800/api/v1/nft/get_recent_nft

export const get_newlyCreated_Nft = async (req, res) => {
  try {
    const nfts = await NFT_model.find().sort({ NFT_token_ID: -1 }).limit(3).exec();
    return res.status(200).json({
      success: true,
      message: "fetching data is successfull",
      nfts
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message:"error in fetching NFTs"
    })
  }
}
// Get all NFTS 
//GET METHOD
//PUBLIC API  = http://localhost:8800/api/v1/nft/All_NFTs
export const get_ALL_Nft = async (req, res) => {
  try {
    const nfts = await NFT_model.find();
    return res.status(200).json({
      success: true,
      message: "fetching All NFTs data is successfull",
      nfts,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "error in fetching ALL NFTs",
    });
  }
};

