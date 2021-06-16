var con = require('../../config/db.config')

const Notification = function (notification) {
  this.idUser = notification.idUser
  this.message = notification.message
  this.data = new Date()
}

Notification.findByUser = async (idUser) => {
  let result = await con.query(
    `SELECT * FROM tb_notifications WHERE status != 'inativo' AND idUser = ? ORDER BY idNotification DESC`,
    [idUser]
  )
  return result[0]
}

Notification.create = async (notification) => {
  const newNotification = new Notification(notification)

  let result = await con.query(
    `INSERT INTO tb_notifications SET ?`,
    newNotification
  )
  return result[0]
}

Notification.update = async (id, notification) => {
  const result = await con.query(
    'UPDATE tb_notifications SET ? WHERE idNotification = ?',
    [notification, Number(id)]
  )
  return result[0]
}

module.exports = Notification
