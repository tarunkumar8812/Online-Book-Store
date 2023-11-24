const mongoose = require("mongoose")
const moment = require("moment")
const ObjectId = mongoose.Types.ObjectId.isValid

// ------------------------------- validations for New Book Creation -------------------------------
const validBookTitle = function (value) {
    if (value == undefined) { return "Book Title is mandatory" }
    if (typeof value !== "string") { return "Book Title must be string" }
    if (value.trim() == "") { return "Book Title can not be empty" }

    return true
}


const validBookExcerpt = function (value) {
    if (value == undefined) { return "Book Excerpt is mandatory" }
    if (typeof value !== "string") { return "Book Excerpt must be string" }
    if (value.trim() == "") { return "Book Excerpt can not be empty" }

    return true
}


const validUserId = function (value) {
    if (value == undefined) { return "UserId is mandatory" }
    if (typeof value !== "string") { return "UserId must be in string" }
    if (value.trim() == "") { return "UserId can not be empty" }
    if (!ObjectId(value.trim())) { return "UserId must be in Object-Id format" }

    return true
}


const validISBN = function (value) {
    if (value == undefined) { return "ISBN is mandatory" }
    if (typeof value !== "string") { return "ISBN must be in string" }
    if (value.trim() == "") { return "ISBN can not be empty" }

    let regex = /^(?=(?:\D*\d){13}(?:(?:\D*\d){3})?$)[\d-]+$/
    let validRegex = regex.test(value)
    if (validRegex == false) { return "Invalid ISBN, (should be of 13 digits e.g 978-0-596-52068-7)" }

    return true
}


const validCategory = function (value) {
    if (value == undefined) { return "Book category is mandatory" }
    if (typeof value !== "string") { return "Book category must be string" }
    if (value.trim() == "") { return "Book category can not be empty" }

    let regex = /^[a-zA-Z /]+$/
    let validRegex = regex.test(value)
    if (validRegex == false) { return "Book category in wrong format, available characters are ( A-Z a-z / )" }

    return true
}


const validSubcategory = function (value) {
    if (value == undefined) { return "Book subcategory is mandatory" }
    if (typeof value !== "string") { return "Book subcategory must be string" }
    if (value.trim() == "") { return "Book subcategory can not be empty" }

    let regex = /^[a-zA-Z /]+$/
    let validRegex = regex.test(value)
    if (validRegex == false) { return "Book subcategory in wrong format, available characters are ( A-Z a-z / )" }

    return true
}


const validReview = function (value) {
    if (value == undefined) { return true }
    if (typeof value !== "number") { return "reviews must be number without string" }
    if (value != 0) { return "reviews must be 0 while creating book" }

    return true
}
const validReleasdAt = function (value) {
    if (value == undefined) { return "releasedAt is mandatory" }

    let date = moment.utc(value, "YYYY-MM-DD", true)
    if (date.isValid() == false) { return "Enter Date in valid format eg. (YYYY-MM-DD)...!" }

    return true
}


const validIsDeleted = function (value) {
    if (value == undefined) { return true }
    if (value != false) { return "isDeleted can be false in boolean only" }

    return true
}


const validExcerpt_4_Update = function (value) {
    if (typeof value !== "string") { return "Book Excerpt must be string" }
    if (value.trim() == "") { return "Book Excerpt can not be empty" }

    return true
}


const validBookTitle_4_Update = function (value) {
    if (typeof value !== "string") { return "Book Title must be string" }
    if (value.trim() == "") { return "Book Title can not be empty" }

    return true
}



const validISBN_4_Update = function (value) {
    if (typeof value !== "string") { return "ISBN must be in string" }
    if (value.trim() == "") { return "ISBN can not be empty" }

    let regex = /^(?=(?:\D*\d){13}(?:(?:\D*\d){3})?$)[\d-]+$/
    let validRegex = regex.test(value)
    if (validRegex == false) { return "Invalid ISBN, (should be of 13 digits e.g 978-0-596-52068-7)" }

    return true
}


const validReleasdAt_4_Update = function (value) {
    let date = moment.utc(value, "YYYY-MM-DD", true)
    if (date.isValid() == false) { return "Enter Date in valid format eg. (YYYY-MM-DD)...!" }

    return true
}

module.exports = { validBookTitle, validBookExcerpt, validUserId, validISBN, validCategory, validSubcategory, validReview, validReleasdAt, validIsDeleted, validExcerpt_4_Update, validBookTitle_4_Update, validISBN_4_Update, validReleasdAt_4_Update }