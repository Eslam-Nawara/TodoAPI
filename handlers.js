const GetTasks = (request, response )=> {
    var tasks []Task
    db.Find(&tasks)
    jsonData, _ := json.MarshalIndent(tasks, "", "  ")

    writer.WriteHeader(http.StatusOK)
    writer.Write(jsonData)
}
