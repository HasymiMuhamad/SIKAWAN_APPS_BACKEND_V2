const complaintModel = require('../model/complaint'),
  doeModel = require('../model/doe'),
  studentModel = require('../model/student'),
  schoolModel = require('../model/school');

// make complaint
exports.complaint = (req, res, next) => {
  studentModel.find({ user: req.id }, (err) => {
    if (err) {
      res.status(401).json({
        success: false,
        message: 'You are not authorized to make complaint'
      });
    }
    if (req.files) {
      var filenameArray = [];
      for (let i = 0; i < req.files.length; i++) {
        filenameArray.push(req.files[i].url);
      }
    }

    var makecomplaint = new complaintModel({
      complaint: req.body.complaint,
      image: filenameArray ? filenameArray : null,
      user: req.id,
      school: req.school
    });
    makecomplaint.save(err => {
      if (err) {
        next(err);
      } else {
        Promise.all([
          studentModel.findByIdAndUpdate(req.id, { $push: { complaint: makecomplaint._id } }, { new: true }),
          schoolModel.findById(req.school)
        ])
          .then((result) => {
            doeModel.findByIdAndUpdate(result[1].doe, { $push: { complaints: makecomplaint._id } }, err => {
              if (err) {
                next(err);
              }
              if (result) {
                complaintModel.findById(makecomplaint._id)
                  .populate('user', 'fullname')
                  .populate('school', 'fullname')
                  .then((data) => {
                    res.status(201).json({
                      success: true,
                      message: 'Complaint Created',
                      data: data
                    });
                  });
              }
            });
          })
          .catch(next);
      }
    });
  });
};

// get Response
exports.getResponse = (req, res, next) => {
  complaintModel.find({ user: req.id }, '-user -school')
    .exec((err, data) => {
      if (err) {
        next(err);
      } else {
        res.status(200).json({
          success: true,
          message: 'complaints found',
          data: data
        });
      }
    });
};

//doe get all complaint
exports.allComplaintDoe = (req, res, next)=>{
  complaintModel.find({}, err => {
    if(err){
      res.status(401).json({
        success: false,
        message: "You don't have access to read complaints"
      })
    }
  })
  .populate('doe', 'fullname')
  .populate('school', 'fullname')
  .populate({path:'user', select:'fullname parent kelas ',
    populate:{path:'kelas', select:'fullname'}})
    .then((result) => {
      console.log(result)
      res.status(200).json({
        success: true,
        message: 'all complaint',
        data: result
      });
    })
    .catch(next);
};

//get all complaint
exports.allComplaintSchool = (req, res, next) => {
  complaintModel.find({ school: req.id }, err => {
    if (err) {
      res.status(401).json({
        success: false,
        message: 'You don\'t have access to read complaints'
      });
    }
  })
    .populate('doe', 'fullname')
    .populate('school', 'fullname')
    .populate({
      path: 'user', select: 'fullname parent kelas ',
      populate: { path: 'kelas', select: 'fullname' }
    })
    .then((result) => {
      // console.log(result);
      res.status(200).json({
        success: true,
        message: 'all complaint',
        data: result
      });
    })
    .catch(next);
};

// one complaint
exports.oneComplaint = (req, res, next) => {
  complaintModel.find({
    $or: [
      { school: req.id },
      { doe: req.id }
    ]
  }, err => {
    if (err) {
      res.status(401).json({
        success: false,
        message: 'You don\'t have access to read complaints'
      });
    }
    complaintModel.findById(req.params.id)
      .populate('school', 'fullname')
      .populate('doe', 'fullname')
      .populate({
        path: 'user', select: 'fullname parent kelas ',
        populate: { path: 'kelas', select: 'fullname' }
      })
      .then((result) => {
        res.status(200).json({
          success: true,
          message: 'Complaint',
          data: result
        });
      })
      .catch(next);
  });
};

// response complaint
exports.complaintResponse = (req, res, next) => {
  let field = {
  };
  if(req.role ==='doe'){
    field.approvedDoe = true
  }else if(req.role === 'school'){
    field.responseSchool = req.body.response,
    field.statusResponseSchool = true
  }else{
    return res.status(401).json({
      success: false,
      message: 'You are not authorized to give response'
    });
  }
  complaintModel.findByIdAndUpdate(req.body.id, { $set: field }, { new: true })
    .populate({
      path: 'user', select: 'fullname parent kelas ',
      populate: { path: 'kelas', select: 'fullname' }
    })
    .populate('doe', 'fullname')
    .populate('school', 'fullname')
    .exec()
    .then((result) => {
      // console.log(result);
      res.status(200).json({
        success: true,
        message: 'Response sent',
        data: result
      });
    })
    .catch(next);
};
