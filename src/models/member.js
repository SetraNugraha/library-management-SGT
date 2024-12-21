import prisma from "../config/database.js"

//  Validate
const findExistsEmail = async (email) => {
  const existsEmail = await prisma.members.findUnique({
    where: {
      email: email,
    },
  })

  return existsEmail
}

// POST
const insertNewMember = async (reqBody) => {
  try {
    const result = await prisma.members.create({
      data: {
        name: reqBody.name,
        email: reqBody.email,
        phone: reqBody.phone,
        address: reqBody.address,
      },
    })

    return result
  } catch (error) {
    console.error("Error in model insert new member: ", error)
    throw new Error("Internal server error")
  }
}

// Validate
const isExistsMember = async (id) => {
  const result = await prisma.members.findUnique({
    where: { id: id },
  })

  if (result) {
    return true
  }

  return false
}

// GET
const historyBorrowingByMemberId = async (id, status, page, limit) => {
  try {
    const defaultStatus = ["BORROWED", "RETURNED"]
    const queryStatus = status ? { equals: status } : { in: defaultStatus }
    const offset = (page - 1) * limit

    const result = await prisma.members.findUnique({
      where: { id: id },
      include: {
        borrowing: {
          where: {
            member_id: id,
            status: queryStatus,
          },
          skip: offset,
          take: limit,
          include: {
            book: true,
          },
        },
      },
    })

    const totalBorrowing = await prisma.borrowings.count({
      where: {
        member_id: id,
        status: queryStatus,
      },
    })

    return {
      data: result,
      pagination: {
        total: totalBorrowing,
        page: page,
        limit: limit,
        totalPages: Math.ceil(totalBorrowing / limit),
      },
    }
  } catch (error) {
    console.error("Error in model get history borrowing by member id: ", error)
    throw new Error("Internal server error")
  }
}

export default {
  findExistsEmail,
  insertNewMember,
  historyBorrowingByMemberId,
  isExistsMember,
}
