#!/bin/bash
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

should_exit_with_non_zero_on_failure(){
    cat > failure_test.js << EOF
require("..").install();
test("this fails", () => {
    throw new Error("something wrong");
});
EOF

    node failure_test.js
}

should_have_exit_status_zero_on_failure(){
    cat > pass_test.js << EOF
require("..").install();
test("this is ok", () => { });
EOF

    node pass_test.js
}

should_have_exit_status_zero_on_failure >> /dev/null
if [[ $? != 0 ]]; then
    echo "It exited with non-zero status on a non-failing test!"
    exit 1
fi

should_exit_with_non_zero_on_failure >> /dev/null
if [[ $? == 0 ]]; then
    echo "It did not exit with non-zero status on failure!"
    exit 1
fi

MINI_MOCHA_IGNORE_FAILURE=true should_exit_with_non_zero_on_failure >> /dev/null
if [[ $? != 0 ]]; then
    echo "The processor should not exit with non-zero when MINI_MOCHA_IGNORE_FAILURE is set"
    exit 1
fi
