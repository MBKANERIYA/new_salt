const Address = require("../Model/Address");

// Add a new address
module.exports.addAddress = async (req, res) => {
    const { userId } = req.params;
    const { firstname, lastname, street, additionalInfo, postalCode, city, state, country, mobile } = req.body;

    try {
        let addressDoc = await Address.findOne({ userId });

        const newAddress = { firstname, lastname, street, additionalInfo, postalCode, city, state, country, mobile };

        if (addressDoc) {
            addressDoc.addresses.push(newAddress);
            await addressDoc.save();
        } else {
            addressDoc = new Address({
                userId,
                addresses: [newAddress],
            });
            await addressDoc.save();
        }

        return res.status(201).send({
            status: true,
            message: "Address added successfully",
            address: addressDoc,
        });
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
};

// Get all addresses for a user
module.exports.getAddress = async (req, res) => {
    const { userId } = req.params;

    try {
        const addressDoc = await Address.findOne({ userId });

        if (!addressDoc) {
            return res.status(200).send({
                status: true,
                message: "No addresses found",
                address: { addresses: [] },
            });
        }

        return res.status(200).send({
            status: true,
            message: "Addresses retrieved",
            address: addressDoc,
        });
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
};

// Delete an address
module.exports.deleteAddress = async (req, res) => {
    const { userId, addressId } = req.params;

    try {
        const addressDoc = await Address.findOne({ userId });

        if (!addressDoc) {
            return res.status(404).send({ status: false, message: "No addresses found" });
        }

        addressDoc.addresses = addressDoc.addresses.filter(
            (addr) => addr._id.toString() !== addressId
        );

        await addressDoc.save();

        return res.status(200).send({
            status: true,
            message: "Address deleted successfully",
            address: addressDoc,
        });
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
};
