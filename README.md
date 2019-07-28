# SIKAWAN_APPS_BACKEND_V2
Developing sikawan (Sistem Kawal Pendidikan) V2 using Node.JS, ExpressJS and MongoDB

There was four user : Admin, Teacher, DoE (Department of Education), School

# For Example User : Teacher -- Schedule

Method : GET

```
https:localhost:3000/teacher/schedule
```

Response : 

{
  "success": true,
  "message": "Schedules found",
  "data": [
    {
      "_id": "5cb5afddefab553002ac4dba",
      "classroom": {
        "_id": "5cb193181bce352bed611918",
        "fullname": "xi ipa 1"
      },
      "day": "saturday",
      "startTime": "07:00",
      "endTime": "08:00",
      "__v": 0
    }
  ]
}

