import VkSteps from "../steps/vk.steps.js";

describe("Test of VK UI and VK API",()=>{
    beforeEach(()=>{
        cy.fixture("vkendpoints").then((data) =>{
            cy.visit(data.vk_url)
        })
    })
    it("Test of VK UI and VK API",()=>{
        VkSteps.editPost();
        // VkSteps.loginToMyPage();
        // VkSteps.createPost();
        // VkSteps.addComment();
        // VkSteps.addLike();
        // VkSteps.deletePost();
    })
})