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
            }, {
                listboards: req.body.list
            });

            let tasks = [];
            let list = await Lists.findOne({
                project: req.body.project_id
            });
            let lb = list.listboards
            if (!lb) {
                lb = {
                    list: {},
                    board: {}
                }
            } else {
                for (let board in list.listboards.board) {
                    let col = list.listboards.board[board];
                    // console.log(board);
                    for (let column in col.columns) {
                        // console.log(column);
                        let tc = col.columns[column];
                        for (let task in tc.items) {
                            let tt = tc.items[task];
                            for (let mems of tt.membersAdded) {
                                // console.log(mems);
                                if (mems.user_email === req.body.user_email) {
                                    tt["checked"] = column === "Done";
                                    tasks.push(tt);
                                }
                            }
                        }
                    }
                }
            }

            io.sockets.in(req.body.project_id).emit("getList", { list: lb, tasks });

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
