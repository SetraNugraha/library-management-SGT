import member from "../models/member.js"

const createNewMember = async (reqBody) => {
  try {
    if (reqBody.email) {
      const existsEmail = await member.findExistsEmail(reqBody.email)

      if (existsEmail) {
        throw new Error("email already exists")
      }
    }

    const result = await member.insertNewMember(reqBody)

    return result
  } catch (error) {
    console.error("Error in service create new member: ", error)
    throw error
  }
}

const getHistoryBorrowingByMemberId = async (id, status, page, limit) => {
  try {
    const existsMember = await member.isExistsMember(id)
    if (!existsMember) {
      throw new Error("member not found")
    }

    const result = await member.historyBorrowingByMemberId(id, status, page, limit)
    return result
  } catch (error) {
    console.error("Error in service get history borrowing by member id: ", error)
    throw error
  }
}

export default {
  createNewMember,
  getHistoryBorrowingByMemberId
}
