module.exports = {
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    return date.toLocaleDateString();
  },
  format_amount: (amount) => {
    // format large numbers with commas
    return parseInt(amount).toLocaleString();
  },
  format_mealList: (string) => {
    let list = string.split(",")
    // let html = ''
    // for (let i = 0; i < list.length - 1; i++) {
    //   html = html + `<li>${list[i]}</li>`
    // }
    return list
  }
};


// const format_mealList = (string) => {
//     console.log(string.split(","))
//     let list = string.split(",")
//     let html = ''
//     for (let i = 0; i < list.length - 1; i++) {
//       html = html + `<li>${list[i]}</li>`
//     }
//     console.log(html)
//     return html
// }


// const test = "one,two,three,four,five"

// format_mealList(test)