# A practical example of how to build an application with ASP.NET Core API and Angular from start to finish

Full stack learning course from [Udemy](https://www.udemy.com/course/build-an-app-with-aspnet-core-and-angular-from-scratch/) with Neil Cummings. Just learning C#, .NET, SQL and Angular/TypeScript

## Technology Stack

+ C#
+ .NET
+ Entity Framework
+ SQL
+ Angular
+ TypeScript
+ Tailwind CSS + Daisy UI Framework

## Section 1: Introduction

+ Building a Web App with .NET, Entity Framework & Angular from scratch
+ Uses Angular v20 and .NET v9
+ Will be building example *Dating App*
+ Will be building *Authentication* and *Identity*
+ Includes validation errors
+ Will be introducing *SignalR* as well, an open-source library that allows server-side code to push real-time content to connected clients instantly (kind of like web socket)
+ Using .NET/C# (backend) and Angular/TypeScript (front-end/UI)
+ Microsoft has a yearly release cycle, 2026 is currently v10
+ *Postman* will be used to call the API

## Section 2: Building a walking skeleton Part 1

+ *Walking Skeleton* is a tiny implementation of a system that performs a end-to-end function. It does not use the final architecture, but it should link together the main architectural components. The architecture and functinality can evolve in parallel.
+ A *Walking Skeleton* can also be an end-to-end minimal working system
+ AKA data in a databaes
+ Database => API => Angular queries the API
+ Get *C# Dev Kit*, **C# Extensions** from Extensions
+ Run `dotnet run` to run the application
+ Run `dotnet dev-certs https --check` to check for valid certificates
+ Run `dotnet dev-certs https --clean` if certificates are not valid
+ Then run `dotnet dev-certs https --trust` to reenable the certs
+ *Entity Classes* are aka *Models* and maps to a database table in a relational database
+ Each *Entity* refers to a *column* to that data table
+ Each *Instance* of the *Entity* refers to a *row* of that table
+ If we want to use a class from a different name space, we have to specify at the top of the class and provide it where it is coming from
+ *Auto Implemented* property is has *getters* and *setters* and are *Public* by default
+ Anything that is *Public* option, other classes can get or set the value

```csharp
public string UserId { get; set; } = Guide.NewGuide().ToString();
```

+ *Private* option means the property can only be used inside of the Class it self

```csharp
private string UserName { get; set; }
```

+ *Protected* option means the property can only be used within Derived/Child classes

```csharp
protected string UserEmail { get; set; }
```

+ Adding a *required* modifier means the class cannot be created without that property

```csharp
public required string DisplayName { get; set; }
```

+ **Entity Frame** is a ORM aka Object Relational Mapper => Translates our code to SQL commands that update our tables in the DB
+ SQLite is light weight, doesn't require a DB server and saves to a file => It is light weight
+ SQLite is not production worthy, but it is great for dev and is very portable
+ Entity Framework will give us methods like `DbContext` to write directly and get/set data in our DB

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

+ Entity Framework feature will allow us to:
    - Query our DB
    - Gives us change tracking (keeps track of changes occuring)
    - Save the DB (insert, update, delete)
    - Concurrency: Protect overriding changes from other users
    - Transactions
    - Caching: Repeated quering will return data from cache instead of requerying the DB
    - Built-in conversions
    - Configurations
    - Migrations
+ Run `dotnet restore` to update and restore packages when adding/removing packages from `.csproj` files
+ **IMPORTANT**: Your packages need to match the major version

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

+ Angular has major releases every 6 months
+ .NET has major releases every 1 year
+ Run `ng new NAME_OF_PROJECT` to create a new Angular project
+ Run `ng serve` to build and run our Angular project
+ In `app.ts` file the `selector` value matches what is inside the index.html `<app-root>` element
+ `imports` define what other functionality we want to *import* inside the component
+ When things are flagged as `protected` in the `app.ts` file, it means nothing can access it other than its direvative or child components
+ Angular is a *TypeScript First* language, everything is written in TypeScript
+ It helps to run `developer reload window` in VS code command prompt to help troubleshoot VS Code sometimes
+ In order to provide funcitonality to our App as a whole update the `app.config.ts` file

```ts
import { provideHttpClient } from '@angular/common/http'; // provides our app with ability to fetch data from an API

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient()
  ]
};
```

+ All classes should have a `constructor` so we can inject in our Http client

```ts
export class App {
  protected title = 'Dating App';

  constructor(private http: HttpClient) {}
}
```

+ But it is highly recommended in modern Angular programming we inject it instead
+ Functionality injections should happen at the top of the Class

```ts
export class App {
  private http = inject(HttpClient);
  protected title = 'Dating App';
}
```

+ An *Observable* is a tool for managing asynchronous data streams, represents a stream of data that can emit multiple values over time
+ To make an request add a Angular Life Cycle Method and add a `.get()` method
+ To "Observe" an Observable we have to "Subscribe" to it via the `subscribe()` method
+ The `next`, `error` and `complete` properties will return to us a "Response" and uses a callback function
+ Typically when you "Subscribe" to something, it is good practice to "Unsubscribe" from it
+ If we don "Unsubscribe", we would be consuming browser memory
+ HOWEVER, Http Requests has the `complete` property, therefore it unsubscribes on its own via the `complete` method

```ts
export class App implements Oninit {
  private http = inject(HttpClient);
  protected title = 'Dating App';

  ngOnInit(): void {
    // URL is hardcoded but is not recommended
    this.http.get('https://localhost:5001/api/members').subscribe({
      next: response => console.log(response),
      error: error => console.log(error),
      complete: () => console.log('Completed the http request')
    })
  }
}
```

+ CORS Error is a "Cross Origin Resource Sharing" Error, it is a safety error where 2 domains can't request/share resources
+ *Middleware* is software that modifies our Http Requests on its way in OR on its way out OR it does authentication checks
+ It is best to use the `protected` to make data available to children or the Class itself as well as the Template itself
+ *Angular Control Flow* are things like `@for` loops
+ Never use a `await` with a `return` statement, it doesnt make sense
+ It is cleaner to do a life cycle method to query and get your data like so:

```ts
  ngOnInit(): void {
    this.http.get(this.API).subscribe({
      next: response => this.members.set(response),
      error: error => console.log(error),
      complete: () => console.log('Completed the http request')
    });
  }
```

+ BUT your can also get your data by calling another method

```ts
  async ngOnInit() {
    this.members.set(await this.getMembers())
  }

  async getMembers() {
    try {
      return lastValueFrom(this.http.get(this.API));
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
```

+ DaisyUI is a framework for TailwindCSS
+ TailwindCSS is a utility plugin
+ `http` should only be on dev and testing
+ To use `https` we will need to have the proper host certificates
+ Use [https://github.com/filosottile/mkcert](https://github.com/filosottile/mkcert) for a low code route
+ Easier to install with *homebrew* on Mac

## Section 4: Authtentication Basics

+ JWT or JSON Web Tokens can be used for *Authentication*
+ *DRY Coding* stands for *Do Not Repeat Coding*, use *Inheritance* and *Extension Methods* to help with Dry Coding
+ You should always start with *Requirements* when starting a new project, such as:
  - Users should be able to log in
  - Users should be able to register
  - Users should be able to vew other users
  - Users should be able to privately message other users
+  Current options to store passwords:
  - Store password in clear text (not a great way)
  - Hash the password (not a great way)
  - Hashing and Salting the password (easy to implement, best way out of the three)
  - The actual best way we will use later is _ASP.NET Identity_
+ Password Hashing is adds a layer of security by adding a "one way" process to scramble the password
+ Password Salting adds another layer by adding unique random strings of characters to a password through cryptographic hash function, randomizes the Password Hash even further
+ Create a API Controller to help wity DRY Coding

```csharp
// BaseApiController
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaseApiController : ControllerBase
    {
        // ...
    }
}

// Members Controller
namespace API.Controllers
{
    public class MembersController(AppDbContext context) : BaseApiController // calls the "BaseApiController" parent controller
    {
        // ...
    }
}
```
