const getConnection = require('../../model/common/db')

class Work {
  constructor(title='', content='') {
    this.title = title;
    this.content = content;
  }

  get_title() {
    return this.title;
  }

  set_title(title) {
    this.title = title;
  }

  get_content() {
    return this.content;
  }

  set_content() {
    this.content = content;
  }

  set_data_from_body(body) {
    let ele;
    for (ele in body){  
      this[ele] = body[ele];
    }
  }

  get_all_works() {
    return new Promise((resolve, reject) => {
      let sql = 'select * from board;';
      getConnection().query(sql, function(err, data){
        if(err) {
          console.log(err);
          reject(err);
        }
        console.log(data);
        resolve(data);
      })
    })
  }
}

module.exports = Work;