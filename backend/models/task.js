export default (sequelize, DataTypes) => {
  const Task = sequelize.define(
    "Task",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      description: DataTypes.TEXT,
      location: DataTypes.STRING(255),
      start_time: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      end_time: DataTypes.DATE,
      status: {
        type: DataTypes.ENUM(
          "pending",
          "in_progress",
          "completed",
          "cancelled"
        ),
        allowNull: false,
        defaultValue: "pending",
      },
      picture: DataTypes.TEXT,
    },
    {
      tableName: "tasks",
      underscored: true,
      timestamps: true,
    }
  );

  Task.associate = (models) => {
    Task.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user",
    });
  };

  return Task;
};
