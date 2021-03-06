const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

const RecordSchema = new Schema({
     employee: {
          type: Schema.Types.ObjectId,
          ref: "Employee",
     },
     name: {
          type: String,
          // required: true
     },
     in: {
          type: String,
          default: ""
     }, 
     out: {
          type: String,
          default: ""
     },
     // out: String,
     date: String,
     // date1: Date,
     date1: String,
     punch: {
          type: Object,
     },
     //  date: {
     //       date: {
     //            type: String,
     //       },
     //       in: {
     //            type: String,
     //       },
     //       out: {
     //            type: String,
     //       },
     //  },
     update_date: {
          type: Date,
          default: Date.now,
          // required: true,
     },
});

module.exports = Record = mongoose.model("record", RecordSchema);