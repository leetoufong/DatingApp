# A practical example of how to build an application with ASP.NET Core API and Angular from start to finish

Full stack learning course from [Udemy](https://www.udemy.com/course/build-an-app-with-aspnet-core-and-angular-from-scratch/) with Neil Cummings. Just learning C#, .NET, SQL and Angular/TypeScript

## Technology Stack

- C#
- .NET
- Entity Framework
- SQL
- Angular
- TypeScript

## Section 1: Introduction

- Building a Web App with .NET, Entity Framework & Angular from scratch
- Uses Angular v20 and .NET v9
- Will be building example *Dating App*
- Will be building *Authentication* and *Identity*
- Includes validation errors
- Will be introducing *SignalR* as well, an open-source library that allows server-side code to push real-time content to connected clients instantly (kind of like web socket)
- Using .NET/C# (backend) and Angular/TypeScript (front-end/UI)
- Microsoft has a yearly release cycle, 2026 is currently v10
- *Postman* will be used to call the API

## Section 2: Building a walking skeleton Part 1

- Walking Skeleton is a tiny implementation of a system that performs a end-to-end function. It does not use the final architecture, but it should link together the main architectural components. The architecture and functinality can evolve in parallel.
- AKA data in a databaes
- Database => API => Angular queries the API
- Get *C# Dev Kit*, **C# Extensions** from Extensions
- Run `dotnet run` to run the application
- Run `dotnet dev-certs https --check` to check for valid certificates
- Run `dotnet dev-certs https --clean` if certificates are not valid
- Then run `dotnet dev-certs https --trust` to reenable the certs
- *Entity Classes* are aka *Models* and maps to a database table in a relational database
- Each *Entity* refers to a *column* to that data table
- Each *Instance* of the *Entity* refers to a *row* of that table
- If we want to use a class from a different name space, we have to specify at the top of the class and provide it where it is coming from
- *Auto Implemented* property is has *getters* and *setters* and are *Public* by default
- Anything that is *Public* option, other classes can get or set the value

```csharp
public string UserId { get; set; } = Guide.NewGuide().ToString();
```

- *Private* option means the property can only be used inside of the Class it self

```csharp
private string UserName { get; set; }
```

- *Protected* option means the property can only be used within Derived/Child classes

```csharp
protected string UserEmail { get; set; }
```

- Adding a *required* modifier means the class cannot be created without that property

```csharp
public required string DisplayName { get; set; }
```

- **Entity Frame** is a ORM aka Object Relational Mapper => Translates our code to SQL commands that update our tables in the DB
- SQLite is light weight, doesn't require a DB server and saves to a file => It is light weight
- SQLite is not production worthy, but it is great for dev and is very portable
- Entity Framework will give us methods like `DbContext` to write directly and get/set data in our DB

```csharp
[AppUser]
DbContext.Users.Add(new User { Id = 4, Name = John })
↓
[Enity Framework] → DbContext
Sqlite Provider
↓
[DB]
| Id | UserName | Emai |
| --- | --- | --- |
| 1 | Bob | bobs@email.com |
| 2 | Tom | toms@email.com |
| 3 | Sam | sams@email.com |
```

- Entity Framework feature will allow us to:
    - Query our DB
    - Gives us change tracking (keeps track of changes occuring)
    - Save the DB (insert, update, delete)
    - Concurrency: Protect overriding changes from other users
    - Transactions
    - Caching: Repeated quering will return data from cache instead of requerying the DB
    - Built-in conversions
    - Configurations
    - Migrations
- Run `dotnet restore` to update and restore packages when adding/removing packages from `.csproj` files
- **IMPORTANT**: Your packages need to match the major version

```csharp
// API.csproj
<Project Sdk="Microsoft.NET.Sdk.Web">

  <PropertyGroup>
    <TargetFramework>net10.0</TargetFramework> // net10 is our major veresion
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.EntityFrameworkCore.Design" Version="10.0.0" /> // package refs need to match the major
    <PackageReference Include="Microsoft.EntityFrameworkCore.Sqlite" Version="10.0.0" /> // package refs need to match the major
  </ItemGroup>

</Project>
```

- If you're not sure what something does, hover your mouse over a Class Name or Prop and you will get proper documentation and hints

## Section 3: Building a walking skeleton Part 2 - Angular

- Angular has major releases every 6 months
- .NET has major releases every 1 year
- Run `ng new NAME_OF_PROJECT` to create a new Angular project
- Run `ng serve` to build and run our Angular project
- In `app.ts` file the `selector` value matches what is inside the index.html `<app-root>` element
- `imports` define what other functionality we want to *import* inside the component
- When things are flagged as `protected` in the `app.ts` file, it means nothing can access it other than its direvative or child components
- Angular is a *TypeScript First* language, everything is written in TypeScript