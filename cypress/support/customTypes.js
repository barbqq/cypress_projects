import {defineParameterType} from "@badeball/cypress-cucumber-preprocessor";

defineParameterType({
    name: "state",
    regexp: /(not exist|to be|not to be|have attr|not have attr)?/,
    transformer: (value) => {
        let result;
        switch(value) {
            case "to be":
                result = "be.visible";
                break;
            case "not to be":
                result = "not.be.visible";
                break;
            case "have attr":
                result = "have.attr";
                break;
            case "not have attr":
                result = "not.have.attr";
                break;
            case "not exist":
                result = "not.exist";
                break;
            default:
                throw new Error("No suitable option");
        }
        return result;
    }
})