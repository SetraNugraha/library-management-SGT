import memberService from "../services/memberService.js"

const registerNewMember = async (req, res) => {
  try {
    const { name, email, phone, address } = req.body
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const phoneRegex = /^08[1-9][0-9]{7,10}$/

    if (!(name && email && phone && address)) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      })
    }

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      })
    }

    if (phone.length > 12) {
      return res.status(400).json({
        success: false,
        message: "Phone number cannot be more than 12 character",
      })
    }

    if (!phoneRegex.test(phone)) {
      return res.status(400).json({
        success: false,
        message: "Invalid phone number format",
      })
    }

    const memberData = {
      name: name,
      email: email,
      phone: phone,
      address: address,
    }

    const results = await memberService.createNewMember(memberData)

    if (results) {
      return res.status(201).json({
        success: true,
        message: "Register Success",
        data: results,
      })
    }
  } catch (error) {
    console.error("error in controller register new member: ", error)

    if (error.message === "email already exists") {
      return res.status(400).json({
        success: false,
        message: "email already exists",
      })
    }

    return res.status(500).json({
      success: false,
      message: "Register new member failed",
    })
  }
}

const getHistoryBorrowingByMemberId = async (req, res) => {
  try {
    const member_id = req.params.id
    const { status, page = 1, limit = 10 } = req.query

    if (typeof member_id !== "string") {
      return res.status(400).json({
        success: false,
        message: "member id must be a string",
      })
    }

    if (status && typeof status !== "string") {
      return res.status(400).json({
        status: false,
        message: "status must be a string",
      })
    }

    if (status && !["BORROWED", "RETURNED"].includes(status)) {
      return res.status(404).json({
        success: false,
        message: "status not found, must be BORROWED or RETURNED",
      })
    }

    if (page && isNaN(page)) {
      return res.status(400).json({
        status: false,
        message: "page must be a number",
      })
    }

    if (limit && isNaN(limit)) {
      return res.status(400).json({
        status: false,
        message: "limit must be a number",
      })
    }

    const result = await memberService.getHistoryBorrowingByMemberId(member_id, status, parseInt(page), parseInt(limit))

    if (result.data.borrowing.length === 0) {
      return res.status(200).json({
        success: true,
        message: "Data not found",
      })
    }

    return res.status(200).json({
      success: true,
      message: "get history borrowing by member id success",
      data: result,
    })
  } catch (error) {
    console.error("Error in controller, get history borrowing by member id: ", error)
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
}

export default {
  registerNewMember,
  getHistoryBorrowingByMemberId,
}
