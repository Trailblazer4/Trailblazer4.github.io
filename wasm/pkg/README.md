# C♭ Template Repository

This repository contains the starter code for the C♭ assignments.  The template
has everything (except the test cases) to get you started for the following
assignments:

1. Lexing
2. Parsing
3. Lowering*
   - I will share a VM for our IR so you can test lowering.  This will be
     released along with the lowering assignment.
4. Code generation

I am going to send patch files for you to update the repository for the
following assignments:

5. Garbage collection (GC)
6. Optimization
7. Register allocation

## Using this repository

You will use this repository to submit all programming assignments going
forward.  That is, you will choose the same repository for different Gradescope
assignments.

### Note about latter assignments

There is an important gotcha about the latter assignments: the GC will not be
compatible with the register allocator.  Making them compatible requires
dynamically adjusting stack shape information at each call site (or finding
other ways to let the GC know where register-allocated pointer-valued locals
are) which is simple in theory but gnarly in practice.  So, we will not combine
the two.

So, I recommend creating a tag/branch when you are done with code generation and
keep the GC work and register allocation work on separate branches.

## Directory structure

This is the directory structure we will use in programming assignments:

```
Cargo.toml                     # The project specification for Cargo to build the project.
docs/                          # Assignment descriptions
└── ...                        # Miscallenous documentation, see contents for specific assignments.
LICENSE                        # License terms for the contents of the repo
README.md                      # The file you're reading
runtime/
└── cflat_lib_riscv.c          # C♭ runtime library.  This is where the GC will go.
src/
├── back/                      # The backend (code generation, register allocation)
├── back.rs
├── front/                     # The frontend (lexer, parser, AST, lowering)
├── front.rs
├── lib.rs                     # The root of the library
├── main.rs                    # The CLI tool, i.e. the driver program
├── middle/                    # The middle end (LIR, optimization)
├── middle.rs
├── types.rs                   # C♭ and LIR types
└── utils.rs                   # Various definitions used across the compiler
test-inputs/                   # Various test files
tests/                         # Various test harnesses
zip-submission.sh              # You can use this shell script to create zip files for Gradescope
```

Some general notes:
- You will need to modify only the `src/` directory and the `runtime/`
  directory.  **The autograder will ignore changes to everything else.**
- I will add more basic test cases for each assignment as they are released.  I
  will distribute these as patches.
- Most of my tests will be based on the APIs used in `main.rs`, so you should
  never change the functions and the types called from that file.

Detailed directory structure is below:

### Frontend

```
src/front
├── ast.rs         # Definitions for the C♭ abstract syntax tree
├── lex.rs         # Tokens and the lexer
├── lower.rs       # Lowering from C♭ to LIR
├── parse.rs       # The parser
├── tests/         # This directory is for your own unit tests.  I encourage you
├── tests.rs       # To write unit tests.
└── typecheck.rs   # This is a vestigial module defining type errors.  If you want
                   # You can implement a type checker, but we aren't covering it
                   # Because type checking is part of CS 345, not CS 414.
```

### Middle end

```
src/middle
├── lir.rs   # The definitions for LIR.  This file has lots of helpers you'll need.
├── opt.rs   # The optimizer
└── tests.rs # For your unit tests
```

### Backend

```
src/back
├── riscv
│   ├── asm_out.rs           # Final instruction->text conversion.  You don't need to change it.
│   ├── code_gen.rs          # Code generation (instruction selection + scheduling)
│   ├── reg_alloc            # Register allocators
│   │   └── spill_all.rs     # The default register allocator.  It just puts all variables to the stack.
│   ├── reg_alloc.rs
│   ├── tests                # For your unit tests
│   │   └── common_tests.rs  # Some tests for the code I gave you
│   ├── tests.rs
│   └── validate.rs          # Validator to ensure there are no illegal instructions & register use conflicts between different parts of the compiler.
└── riscv.rs                 # Definitions for the subset of RISC-V we are using
```

## Ground rules for assignments, external crates

You can use all the crates we imported except for `pest`.  It makes the parser
(and the lexer) much simpler, but learning how lexers and parsers work is the
point of those assignments, so you are forbidden from using it.  I use `pest` to
parse intermediate data formats without writing a parser explicitly.  Using
libraries like it could be useful when you write parsers after CS 414.

Here are some crates you can use:
- `internment` for interned strings (e.g., the `Id` type in the repository).
- `regex` for regexes.
- `itertools` and `to_vec` for an elevated iterator experience.

There are other crates imported in the repo you can use too.

## What is given to you, what you need to implement

You are given:
- the core data structures,
- the API between different components,
- some helper functions, and
- templates for other helper functions.

You are expected to implement:
- Everything marked with a `todo!()`, and
- Your own helper functions.

As you are given the data structures and most function signatures, you shouldn't
encounter the sharp edges of the borrow checker frequently.

## LLM use policy

You can use LLMs for:
- understanding certain Rust patterns and certain compilers concepts,
- understanding parts of the template I gave you,
- generating code snippets (small and large).
- generating test cases (they make this much smoother when you are getting started).

You cannot use LLMs for:
- the architectural design of any of the components.

I expect you to be able to explain every single line of code I haven't given
you.  That is all part of interactive grading and a requirement for passing each
assignment.

## Running your compiler

You can run your compiler via `cargo run -- [OPTIONS] <INPUT FILE>`.  This
command **both builds and runs the compiler.**

For example, you can run the following to execute only the lexer on a file named
`foo.cb`.

```
gdb --args target/debug/cflat -o tokens foo.cb
```

For the initial version of this repo, the only option is the output format `-o`.
The valid output formats are:

- `tokens`:   List of tokens
- `source`:   pretty-printed cflat source code
- `ast`:      the ast data structure
- `ast-json`: the ast in JSON format
- `lir`:      lir source code
- `lir-json`: lir in JSON format
- `asm`:      the resulting assembly code
- `exec`:     an executable (as a new file)

The compiler accepts different kinds of inputs, based on the file extension:

- `.cb`: cflat source code
- `.astj`: cflat AST in JSON format.  This skips the lexer and the parser.
- `.lir`: lir source code.  This skips the lexer, the parser and the lowerer.
- `.lirj`: lir in JSON format.  This skips the lexer, the parser and the lowerer.

Later versions of the compiler will also accept:
- Choosing which register allocator to run.
- Choosing which optimizations to enable.

The default behavior of the compiler is to emit an executable, which will not
work on your computer until (1) you implement the code generator, and (2) you
install all the RISC-V tooling (and probably under Linux).  So, **you should
always specify the output format when running the compiler.**

## Debugging your compiler

You can see detailed stack traces via setting the `RUST_BACKTRACE` environment
variable to `1`.  You can do this via `export RUST_BACKTRACE=1` on Unix systems
(I don't use Windows, so you need to look it up if you are using Windows but not
WSL).

You can run your compiler under GDB via `gdb --args target/debug/cflat [OPTIONS] <INPUT FILE>`.
**You need to build it via `cargo build` first.**

For example, you can run the following to execute only the lexer on a file named
`foo.cb`.

```
gdb --args target/debug/cflat -o tokens foo.cb
```

## Reference compiler

I will upload my compiler to CS lab machines.  It runs on x86-64, so you will be
able to use it only on `griffin`.  You will be able to run it via `~memre/cflat`.
It takes the same options as your compiler.

## Assignment descriptions

**The description of each assignment will be made available under the `docs/`
directory when that assignment is released.**  Currently, only the lexer
description is there.

## Testing your assignments

For each assignment, I will give you some small test cases.  There will be more
tests for the assignment in the following categories:
1. Complex test cases,
2. Randomly-generated test cases, and
3. Hidden test cases.

For the first two categories, the autograder will give you the first test case
that fails.  For the last, the autograder will tell you whether your compiler
passes the tests and **maybe** the name of the first failing test case as a
hint.

So, you should:
1. Write your own unit tests,
2. Work through the basic test cases, and
3. Submit to the autograder often after passing the test cases.

While you are doing all this, if you find a small bug, you should add a small
regression test for it to ensure that you don't reintroduce it (finding it out
the next time you submit to the autograder would be too slow).

Also, there will be thousands of randomly-generated test cases for some
assignments so **your compiler cannot be too slow.**

### Writing and running tests

You can write tests under the `tests` modules for the relevant part of the
compiler and use `cargo test`.

You can also write end-to-end tests (like the ones I give you) by creating test
programs under the `tests/` directory.  These also run via `cargo test`.

## Assignment grading

For each assignment,
- You have to pass all the test cases for the assignment before moving on to the
  next assignment.  If more than 50% of the students are behind by more than 1
  assignment after codegen, I will revise this policy.
- Your code must compile without any warnings, including clippy warnings.  If
  you disable some warnings and we find this out during interactive grading, you
  will fail the assignment.  You can automatically fix some clippy warnings (see
  `cargo clippy` tells you how to do this, read its output carefully).
- Your code must have no formatting issues.  You can run `cargo fmt` as a git
  hook to ensure this.
- If something works on your computer but not on the autograder, then whatever
  verdict the autograder gives holds.
- You have to pass interactive grading to pass the assignment.

### Submitting to the autograder

You have to submit either via GitHub or a zip file (the zip file should contain
only the source directory).  To create the zip file, you can run
`./zip-submission.sh` in the repo (it requires the tools `zip` and `zsh` to be
installed), and it will create the right zip file for you.

### The autograder setup

The autograder restricts the system calls your program can make (e.g., you have
no network access) because people have successfully [hacked autograder
setups](https://saligrama.io/blog/gradescope-autograder-security/) before.  So,
your compiler cannot rely on syscalls for anything other than memory allocation
(I'll do file I/O for you).  If this gets in the way of a legitimate solution, I
will debug it.

Also, the autograder will run the program in **release mode** for performance,
so that your solution is less likely to time out.  Normally, the debug vs
release mode shouldn't affect your program's behavior (except that unintended
integer overflows crash the program in debug mode), but I recommend testing your
program in release mode.  See the Cargo manual on how to build in release mode.

## On *actually* compiling and running a program

Our compiler produces a textual assembly file, we need three more ingredients to
produce working programs:

1. An assembler to generate machine code from the assembly code.
2. A C compiler to compile the runtime (the garbage collector and the built-in functions).
3. A linker to link the two.

For these, we will use the [GCC cross-compiling toolchain](https://github.com/riscv-collab/riscv-gnu-toolchain) for
`riscv64-unknown-linux-gnu`.  You can build it from source _on your own_ if you
want.  I will provide pre-built versions of the tooling on `griffin` by the time
we get to the code generation module.

To run the RISC-V programs, we will use the [QEMU userspace an
emulator](https://www.qemu.org/docs/master/user/main.html).  You can install
this pretty easily, and I will also provide it on `griffin`.  **This is
different from the version of QEMU used in other systems courses!**  Those run a
whole OS, whereas the one we use runs only the output of the compiler, so it is
much more lightweight.
