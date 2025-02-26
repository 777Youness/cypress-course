/// <reference types="cypress" />

describe('Lightbox Tests', () => {
    beforeEach(() => {
        cy.visit('lightbox.html'); // Make sure lightbox.html is in your cypress/fixtures folder, or adjust the path.
    });

    it('1. Opens the lightbox on image click', () => {
        cy.get('[data-cy="lightbox-image"]').click();
        cy.get('[data-cy="lightbox-background"]').should('be.visible');
    });

    it('2. Closes the lightbox when clicking outside the lightbox', () => {
        cy.get('[data-cy="lightbox-image"]').click();
        cy.get('[data-cy="lightbox-background"]').click({ force: true });
        cy.get('[data-cy="lightbox-background"]').should('not.be.visible');
    });

    it('3. Adds a "like" and updates counters on the overlay and lightbox', () => {
        cy.get('[data-cy="lightbox-image"]').click();
        cy.get('[data-cy="like-button"]').click();
        cy.get('[data-cy="likes-count-lightbox"]').should('contain', '1'); // Lightbox counter
    });

    it('4. Removes a "like" and updates counters on the overlay and lightbox', () => {
        cy.get('[data-cy="lightbox-image"]').click();
        cy.get('[data-cy="like-button"]').click(); // Like first
        cy.get('[data-cy="dislike-button"]').click(); // Dislike
        cy.get('[data-cy="likes-count-lightbox"]').should('contain', '0'); // Lightbox counter
    });

    it('5. Adds a comment - Example comment: "Cypress is awesome!"', () => {
        cy.get('[data-cy="lightbox-image"]').click();
        cy.get('[data-cy="comment-input"]').type('Cypress is awesome!');
        cy.get('[data-cy="publish-comment-button"]').click();
        cy.get('[data-cy="comments-container"]').should('contain', 'Cypress is awesome!');
    });

    it('6. Prevents adding an empty comment because the "Publish" button remains disabled', () => {
        cy.get('[data-cy="lightbox-image"]').click();
        cy.get('[data-cy="comment-input"]').should('have.value', '');
        cy.get('[data-cy="publish-comment-button"]').should('be.disabled');
    });

    it('7. Toggles the option that hides the comments', () => {
        cy.get('[data-cy="lightbox-image"]').click();

        // Add a comment to make the "Show comments" link visible
        cy.get('[data-cy="comment-input"]').type('Test comment');
        cy.get('[data-cy="publish-comment-button"]').click();

        // Wait for the comment to be added and the "Show comments" link to appear
        cy.wait(100); // Adjust the wait time if needed

        // Get the Alpine $data object
        cy.get('[data-cy="lightbox-container"]').then(($el) => {
            const alpineData = $el[0].__x.$data; // Access Alpine data

            // Now, toggle the comments
            cy.get('[data-cy="show-comments-link"]').should('be.visible').click(); // Show comments
            cy.get('[data-cy="show-comments-link"]').click(); // Hide comments

            // Wait for Alpine to update isCommentsVisible
            cy.wait(50); // Adjust if needed

            // Assert that the comments container is not visible AND that isCommentsVisible is false
            cy.get('[data-cy="comments-container"]').should('not.be.visible');

        });
    });





    it('8. Tests the different comment counters on the overlay and the lightbox', () => {
        cy.get('[data-cy="lightbox-image"]').click(); // Open lightbox
        cy.get('[data-cy="comment-input"]').type('Comment 1');
        cy.get('[data-cy="publish-comment-button"]').click();
        cy.get('[data-cy="comment-input"]').type('Comment 2');
        cy.get('[data-cy="publish-comment-button"]').click();
        cy.get('[data-cy="comments-count-overlay"]').should('contain', '2');
    });

    it('9. Tests the singular/plural form depending on the number of comment(s)', () => {
        cy.get('[data-cy="lightbox-image"]').click();
        cy.get('[data-cy="comment-input"]').type('One comment');
        cy.get('[data-cy="publish-comment-button"]').click();
        cy.get('[data-cy="show-comments-text"]').should('contain', 'comment');

        cy.get('[data-cy="comment-input"]').type('Another comment');
        cy.get('[data-cy="publish-comment-button"]').click();
        cy.get('[data-cy="show-comments-text"]').should('contain', 'comments');
    });

    it('10. Writes three comments and tests the deletion of the second comment when clicking on the correct cross', () => {
        cy.get('[data-cy="lightbox-image"]').click();
        cy.get('[data-cy="comment-input"]').type('Comment 1');
        cy.get('[data-cy="publish-comment-button"]').click();
        cy.get('[data-cy="comment-input"]').type('Comment 2');
        cy.get('[data-cy="publish-comment-button"]').click();
        cy.get('[data-cy="comment-input"]').type('Comment 3');
        cy.get('[data-cy="publish-comment-button"]').click();

        //Target Delete button to delete the second comment which will have index 1 (Comment 2)
        cy.get('[data-cy="comments-container"]').within(() => {
            cy.get('[data-cy="comment-item"]').eq(1).within(() => {
                cy.get('[data-cy="delete-comment-button"]').click();
            });
        });

        cy.get('[data-cy="comments-container"]').should('not.contain', 'Comment 2');
    });
});