// ongoing survey
// create survey
import { v4 as uuidv4 } from "uuid"
import checkToken from "~/src/functions/checkToken"
export default eventHandler(async (event) => {
	const storage = useStorage("cransurvey")
	const { token, } = await readBody(event)
	if (!token) {
		return {
			code: 1001,
			msg: "Invalid parameters.",
		}
	}
	if (await checkToken(token)) {

		const surveys: object = await storage.getItem("sid")

		let list = []
		let count = 0

		for (let i in surveys) {
			if (surveys["enable"] == true) {
				list.push(surveys[i])
				count++
			}
		}

		return {	
			code: 0,
			msg: "Success.",
			list,
			count,
		}

    } else {
		return {
			code: 1002,
			msg: "Invalid token.",
		}
	}
})
