using System;
using System.Collections.Generic;

namespace ToDoApi.Models;

public partial class ToDo
{
    public int Id { get; set; }

    public string Title { get; set; } = null!;

    public bool? Completed { get; set; }
}
