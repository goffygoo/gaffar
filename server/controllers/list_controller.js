import Lists from "../model/List.js";

export default function (io) {
    const home = async function (req, res) {
        res.send("List Router is working");
    };

    const getList = async function (req, res) {
        try {
            let list = await Lists.findOne({
                project: req.body.project_id
            });
            if (!list) {
                return res.status(404).send({
                    success: false,
                    message: `tera baap yha kux ni chhodke gya`,
                });
            }
            return res.status(201).send({
                success: true,
                message: "Le bhay thari list",
                resp: list.listboards
            });
        } catch (err) {
            return res.status(404).send({
                success: false,
                message: `Bhai error aara : ${err}`,
            });
        }
    }

    const saveList = async function (req, res) {
        try {
            await Lists.findOneAndUpdate({
                project: req.body.project_id
            },{
                listboards: req.body.list
            })
            return res.status(201).send({
                success: true,
                message: "Teri lisht save krdi",
            });
        } catch (err) {
            return res.status(404).send({
                success: false,
                message: `Bhai error aara : ${err}`,
            });
        }
    }

    return {
        home, getList, saveList
    };
}
